import { z } from 'zod'

const maxYearManufacture = new Date()   
maxYearManufacture.setFullYear(maxYearManufacture.getFullYear())

const minYearManufacture = 1951

const car = z.object({

    brand:
        z.string()
        .max(25, { message: 'A Marca pode ter, no máximo, 25 caracteres' }),

    model:
        z.string()
        .max(25, { message: 'O Modelo pode ter, no máximo, 25 caracteres' }),

    color:
        z.string()
        .max(12, { message: 'A cor pode ter, no máximo, 12 caracteres' }),

    year_manufacture:
        
        z.coerce.number()
        .min(minYearManufacture, { message: 'O ano de fabricação está muito no passado' })
        .max(maxYearManufacture, { message: 'O ano de fabricação deve ser maxímo deste ano' }),

    plates:
        z.string()
        .length(8, { message: 'A placa deve ter, exatamente, 8 caracteres' }),

    selling_price:
        z.coerce.number()
        .min(1000, { message: 'O valor de venda deve ser, no minimo, R$ 1000,00 ' })
        .max(5000000,{ message: 'O valor de venda deve ser, no máximo, R$ 5.000.000,00'}),

    imported:
        z.boolean({ message: 'Esse campo deve ser preenchido apenas com true ou false' }),

})

export default car