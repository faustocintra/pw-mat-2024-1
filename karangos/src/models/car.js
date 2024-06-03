import { z } from 'zod'

const maxManufactureYear = new Date()   // Data de hoje
maxManufactureYear.setFullYear(maxManufactureYear.getFullYear())

const Car = z.object({
    brand:
        z.string()
        .max(25, { message: 'A marca pode ter, no máximo, 25 caracteres' }),

    model:
        z.string()
        .max(25, { message: 'O modelo pode ter, no máximo, 25 caracteres' }),

    color:
        z.string()
        .max(12, { message: 'A cor pode ter, no máximo, 12 caracteres' }),
    
    year_manufacture:
        z.string()
        .transform((val) => parseInt(val))
        .pipe(z.number()
        .min(1951, { message: 'O ano de fabricação está muito no passado' })
        .max(2024, { message: 'O veículo deve ser deste ano ou antes' }))
        .transform((val) => val.toString()),

    imported:
        z.coerce.boolean({ message: 'A resposta só pode ser sim ou não' }),

    plates:
        z.string()
        .length(8, { message: 'A placa deve ter, exatamente, 8 caracteres' }),

    selling_price:
        z.number()
        .min(1000, { message: 'O valor pode ser, no mínimo, 1.000' })
        .max(5000000, { message: 'O valor pode ser, no máximo, 5.000.000' }),
})

export default Car