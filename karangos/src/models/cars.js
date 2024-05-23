import { z } from 'zod'

const maxYearManufacture = new Date()   // Data de hoje
maxYearManufacture.setFullYear(maxYearManufacture.getFullYear())

const minYearManufacture = new Date()
minYearManufacture.setFullYear(minYearManufacture.getFullYear() - 64)

const isImported = z.boolean({
    required_error: "isImported is required",
    invalid_type_error: "isImported must be a boolean",
  })

const Car = z.object({
  brand:
    z.string()
    .max(25, { message: 'O nome da marca precisa ter no máximo 25 caracteres' }),

  model:
    z.string()
    .max(25, { message: 'O nome do modelo precisa ter no máximo 25 caracteres' }),
  color:
    z.string()
    .max(12, { message: 'A cor precisa ter no máximo 12 caracteres' }),

  year_manufacture:
    // coerce força a conversão para o tipo Date, se o valor recebido for string
    z.coerce.date()
    .min(minYearManufacture, { message: 'O veículo deve ser de 1960 adiante' })
    .max(maxYearManufacture, { message: 'A data passou o data de hoje' }),

  imported:
   z.boolean({ message: 'Valor precisa ser Sim ou Não'}),

  selling_price:
    z.number()
    .min(1000, { message: 'O valor mínimo deve ser R$1,000' })
    .max(5000000, { message: 'O valor máximo deve ser R$5,000.000' }),

})

export default Car