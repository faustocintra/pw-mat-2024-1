import { z } from 'zod'

const maxYearManufacture = new Date()   // Data de hoje
maxYearManufacture.setFullYear(maxYearManufacture.getFullYear())

const minYearManufacture = new Date()
minYearManufacture.setFullYear(minYearManufacture.getFullYear() - 64)

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
    .max(maxYearManufacture, { message: 'A data passou a data de hoje' }),

  imported:
   z.coerce.boolean({ message: 'Valor precisa ser Sim ou Não'}),

  plates:
   z.string()
   .refine(val => val.length === 8, { message: 'O número da placa está incompleto' }),

  selling_price:
    z.coerce.number()
    .min(1000, { message: 'O valor mínimo deve ser R$1,000' })
    .max(5000000, { message: 'O valor máximo deve ser R$5,000.000' }),

})

export default Car