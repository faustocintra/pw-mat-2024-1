import { z } from 'zod'

const Car = z.object({
    brand:
        z.string().max(25, {message: 'Máximo de 25 caracteres'}),
    model:
        z.string().max(25, {message: 'Máximo de 25 caracteres'}),
    color:
        z.string().max(12, {message: 'Máximo de 12 caracteres'}),
    year_manufacture:
        z.number().min(1960).max(2024),
    imported:
        z.boolean({
            required_error: 'Resposta obrigatória',
            invalid_type_error: 'Resposta inválida',
        }),
    plates:
        z.string().length(8, {message: 'Deve ter 8 caracteres'}),
    selling_price:
        z.number().min(1000).max(5000000),
})