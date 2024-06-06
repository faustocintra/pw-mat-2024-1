import { z } from 'zod'


const maxYear_manufacture = new Date()   // Data de hoje
maxYear_manufacture.setFullYear(maxYear_manufacture.getFullYear())

const minYear_manufacture = new Date(1951)
minYear_manufacture.setFullYear(minYear_manufacture.getFullYear())


const Car = z.object({
  brand:
    z.string().max(25, { message: 'Máximo de 25 caracteres' }),

  model:
    z.string().max(25, { message: 'Máximo de 25 caracteres' }),

  color:
    z.string().max(12, { message: 'Máximo de 12 caracteres' }),
  
  year_manufacture:
    
    z.coerce.date()
    .min(minYear_manufacture, { message: 'O carro é muito antigo' })
    .max(maxYear_manufacture, { message: 'O carro ainda nao foi lançado' }),

  plates:
  z.string().length(8, { message: 'A placa deve ter no máximo 8 caracteres' }),

  selling_price:
    z.coerce.number()
    .min(1000, { message: 'O valor mínimo é de 1000,00 reais' })
    .max(5000000, { message: 'O valor Máximo é de 5000000,00 reais' }),

  imported:
  z.coerce.boolean({})
  
  
})


export default Car