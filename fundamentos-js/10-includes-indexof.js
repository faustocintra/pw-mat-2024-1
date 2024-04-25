const carros = ['Chevette', 'Fusca', 'Opala', 'Maverick', 'Belina', 'Del Rey']
console.log(carros)

/*
  O método includes() testa se um dado elemento existe em um vetor.
  Retorna true se existir, ou false caso contrário
*/
console.log('Tem Fusca?', carros.includes('Fusca'))
console.log('Tem Corcel?', carros.includes('Corcel'))
console.log('Tem Belina?', carros.includes('Belina'))

/*
  O método indexOf() retorna o índice (posição) de um elemento no vetor.
  Caso o elemento não exista, retorna -1
*/
console.log('Posição de Fusca:', carros.indexOf('Fusca'))
console.log('Posição de Corcel:', carros.indexOf('Corcel'))
console.log('Posição de Chevette:', carros.indexOf('Chevette'))