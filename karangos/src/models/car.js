import { z } from 'zod'

const currentYear = new Date().getFullYear();

const Car = z.object({
  brand:
    z.string()
    .min(1, { message: 'A marca deve ter, no mínimo, 1 caractere' })
    .max(25, { message: 'A marca deve ter, no máximo, 25 caracteres' }),

  model:
    z.string()
    .min(1, { message: 'O modelo deve ter, no mínimo, 1 caractere' })
    .max(25, { message: 'O modelo deve ter, no máximo, 25 caracteres' }),

  color:
    z.string()
    .min(1, { message: 'A cor deve ter, no mínimo, 1 caractere' })
    .max(25, { message: 'A cor deve ter, no máximo, 25 caracteres' }),

  year_manufacture:
    z.string()
    .refine(value => parseFloat(value) >= 1960 && parseFloat(value) <= currentYear, { message: `O ano de fabricação deve ser entre 1960 e ${currentYear}` }),
  
  imported:
    z.string() // os dados já cadastrados estão como 0 e 1, achei melhor manter assim ao invés de colocar booleano para evitar inconsistência de dados
    .refine(value => value === '0' || value === '1', { message: 'O campo de importado deve ser 0 ou 1' }),

  plates:
    z.string()
    .length(8, { message: 'A placa deve conter 8 caracteres' }),

  selling_price:
    z.string() // o tipo dos dados já adicionados é string, achei melhor manter esse tipo ao invés de numérico para evitar inconsistência de dados
    .refine(value => parseFloat(value) >= 1_000 && parseFloat(value) <= 5_000_000, { message: 'O valor do carro deve ser entre R$1.000 e R$5.000.000' }),
})

export default Car