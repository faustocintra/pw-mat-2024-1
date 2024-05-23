import { z } from 'zod'
/*
  O cliente deve ser maior de 18 anos.
  Por isso, para validar a data de nascimento, calculamos
  a data máxima em que o cliente pode ter nascido para ter
  18 anos na data de hoje
*/
const maxYearManufacture = new Date()   // Data de hoje
maxYearManufacture.setFullYear(maxYearManufacture.getFullYear())

// O cliente pode ter nascido, no máximo, há 120 anos
const minYearManufacture = new Date()
minYearManufacture.setFullYear(minYearManufacture.getFullYear() - 64)

const Car = z.object({
  brand:
    z.string()
    .max(25, { message: 'A marca deve ter, no máximo, 25 caracteres' }),
  
  model:
    z.string()
    .max(25, { message: 'O modelo deve ter, no máximo, 25 caracteres' }),
    
  color:
    z.string()
    .max(12, { message: 'A cor pode ter, no máximo, 12 caracteres' }),
    
  year_manufacture:
    z.coerce.date()
    .min(minYearManufacture, { message: 'O ano de fabricação do carro é muito antigo' })
    .min(maxYearManufacture, { message: 'O ano de fabricação do carro deve ser no máximo o ano atual' })
    .nullable(), 

  imported:
    z.boolean(),


  plates:
    z.string()
    .min(8, { message: 'A placa deve ter exatamente 8 caracteres' })
    .max(8, { message: 'A placa deve ter exatamente 8 caracteres' })
    .nullable(),

  selling_price:
    z.coerce.number()
    .gte(1000, {message: 'O valor mínimo é de 1.000 reais'})
    .lte(5000000, {message: 'O valor máximo é de 5.000.000 reais'})

})

export default Car