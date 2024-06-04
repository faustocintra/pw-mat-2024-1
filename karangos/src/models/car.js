import { z } from 'zod'

const currentYear = new Date().getFullYear()

const Car = z.object({
    brand:
    z.string()
    .max(25, { message: ' O nome da marca não pode conter mais de 25 caracteres'}),

    model:
    z.string()
    .max(25, { message: 'O modelo do carro não pode conter mais de 25 caracteres'}),

    color:
    z.string()
    .max(12, { message: ' A cor do carro nao pode conter mais de 12 caracteres'}),

    year_manufacture:
    z.coerce.number()
    .min(1960, { message: 'O ano de fabricação não pode ser menor que 1960'})
    .max(currentYear,{ message: 'O ano de fabricação não pode ser maior do que o ano atual'}),

    imported:
    z.coerce.boolean({ invalid_type_error: 'O valor de imported deve ser um booleano' }),
    
    plates:
    z.string()
    .length(8, { message: ' A placa deve ter exatamente 8 caracteres'}),

    selling_price:
    z.coerce.number()
    .min(1000, { message: 'O preço de venda não pode ser menor que 1000 reais'})
    .max(5000000, { message: 'O preço de venda não pode passar de 5 milhões'}),
    
})

export default Car