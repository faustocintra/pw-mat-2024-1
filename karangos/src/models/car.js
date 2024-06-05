import { z } from 'zod'

const maxYearManufacture = new Date()
maxYearManufacture.setFullYear(maxYearManufacture.getFullYear());
const minYearManufacture = new Date()
minYearManufacture.setFullYear(minYearManufacture.getFullYear() - 73);

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
    .max(maxYearManufacture, { message: 'O ano de fabricação do carro deve ser no máximo o ano atual' })
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