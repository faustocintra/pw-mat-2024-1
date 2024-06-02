
import { Checkbox } from '@mui/material'
import { z } from 'zod'

const maxYear_manufacture = new Date()   // Data de hoje
maxYear_manufacture.setFullYear(maxYear_manufacture.getFullYear())

// o carro pode estar entre 1960 e os dias atuais
const minYear_manufacture = new Date()
minYear_manufacture.setFullYear(minYear_manufacture.getFullYear() - 65)

const Cars = z.object({
    brand:
    z.string()
    .max(25, { message: 'maximo de 25 caracteres' }),

    model:
    z.string()
    .max(25, { message: 'maximo de 25 caracteres' }),

    color:
    z.string()
    .max(12, { message: 'maximo de 12 caracteres' }),

    year_manufacture:
    z.coerce.date()
    .min(minYear_manufacture, { message: 'Data de fabricação está muito no passado' })
    .max(maxYear_manufacture, {message: 'Data de fabricação desde ano no maximo'})
    .nullable(), 

    imported: 
    z.coerce.boolean(),

    plates:
    z.string()
    .length(8, { message: 'A placa deve ter exatamente 8 caracteres' }),

    selling_price: 
    z.coerce.number()
    .gte(1000, {message: 'O valor minimo é de 1000'})
    .lte(5000000, {message: 'O valor maximo é de 1.000.000'}),
})

export default Cars