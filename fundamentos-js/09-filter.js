/*
  O método filter() cria um NOVO VETOR contendo apenas os
  elementos do vetor de origem que atendam ao critério
  especificado pela função passada como parâmetro
*/

// Vetores para busca
const numeros = [12, 19, 3, -4, 13, -11, 15, 0, -1]
const frutas = ['laranja', 'abacaxi', 'maçã', 'uva', 'jabuticaba', 'maracujá']

// Números negativos
const negativos = numeros.filter(n => n < 0)
console.log('Números negativos:', negativos)

// Números pares
const pares = numeros.filter(x => x % 2 === 0)
console.log('Números pares:', pares)

// Frutas que começam com a letra "m"
const comecaComM = frutas.filter(f => f.charAt(0) === 'm')
console.log('Frutas que começam com a letra "m":', comecaComM)

// Frutas que terminam com a letra "i"
const terminaComI = frutas.filter(f => f.slice(-1) === 'i')
console.log('Frutas que terminam com a letra "i":', terminaComI)

// Frutas que terminam com a letra "r"
const terminaComR = frutas.filter(f => f.slice(-1) === 'r')
console.log('Frutas que terminam com a letra "r":', terminaComR)