import { z } from 'zod'

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
        z.number(),

    imported:
        z.boolean({
            required_error: 'Resposta obrigatória',
            invalid_type_error: 'Resposta inválida',
        }),

    plates:
        z.string()
        .length(8, { message: 'A placa deve ter, exatamente, 8 caracteres' }),

    selling_price:
        z.number(),
})