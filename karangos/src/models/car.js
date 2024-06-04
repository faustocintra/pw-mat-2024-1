import { z } from 'zod'

const maxYear = new Date()   // Data de hoje
maxYear.setFullYear(maxYear.getFullYear())

const minYear = new Date(1960, 0, 1)
minYear.setFullYear(minYear.getFullYear())

const Car = z.object({
    brand:
        z.string().max(25, {message: 'Máximo de 25 caracteres'}),
    model:
        z.string().max(25, {message: 'Máximo de 25 caracteres'}),
    color:
        z.string().max(12, {message: 'Máximo de 12 caracteres'}),
    year_manufacture:
        z.coerce.date()
        .min(minYear,{message: 'O ano mínimo é 1960'})
        .max(maxYear,{message: 'O ano máximo é 2024'}),
    imported:
        z.coerce.boolean({
            required_error: 'Resposta obrigatória',
            invalid_type_error: 'Resposta inválida',
        }),
    plates:
        z.string().length(8, {message: 'Deve ter 8 caracteres'}),
    selling_price:
        z.coerce.number()
        .min(1000, {message: 'Valor mínimo de R$1.000,00'})
        .max(5000000, {message: 'Valor máximo de R$5.000.000,00'}),
})

export default Car