/*
  Encontrando o menor o maior número em uma série
*/
let minimo = Math.min(2, -7, 8, 4, 0)
let maximo = Math.max(2, -7, 8, 4, 0)

console.log({minimo, maximo})

// E se os números estiverem dentro de um vetor?
let nums = [2, -7, 8, 4, 0]

minimo = Math.min(nums)   // NÃO FUNCIONA
maximo = Math.max(nums)   // NÃO FUNCIONA

console.log({minimo, maximo})

/*
  A sintaxe de espalhamento ou spreading (representada por ... 
  antes do nome da variável) é capaz de "desempacotar" um vetor
  em uma série de valores avulsos
*/
minimo = Math.min(...nums)
maximo = Math.max(...nums)

console.log({minimo, maximo})

/*************************************************************/

let carro1 = {
  modelo: 'Fiorino',
  marca: 'Fiat',
  ano: 1984,
  cor: 'bege'
}

// Copiando carro1 para carro2
// let carro2 = carro1  // NÃO FUNCIONA

// USANDO ESPALHAMENTO PARA OBTER UMA CÓPIA REAL DO OBJETO
let carro2 = { ...carro1 }

// Mudando o valor das propriedades de carro2
carro2.modelo = 'Opala'
carro2.marca = 'Chevrolet'
carro2.cor = 'preto'
carro2.ano = 1979

console.log({carro1, carro2})

/***********************************************************/

// PROBLEMA: juntar dois ou mais vetores em um novo vetor

let frutas = ['maçã', 'banana', 'laranja']
let verduras = ['alface', 'couve', 'rúcula']

// Usando JS "clássico"
// let hortifruti = frutas.concat(verduras)

// Usando espalhamento
let hortifruti = [ ...frutas, ...verduras ]

console.log({hortifruti})

/***********************************************************/

// PROBLEMA: escrever uma função capaz de receber um número
// arbitrário de parâmetros

console.log('Soma 7 números:', soma(1, 2, 3, 4, 5, 6, 7))
console.log('Soma 12 números:', soma(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12))

function soma(...nums) {
  let resultado = 0
  for(let n of nums) resultado += n
  return resultado
}