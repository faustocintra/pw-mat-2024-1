/*
  Função que calcula a área de uma figura geométrica plana
*/

// forma é um parâmetro predefinido
function calcArea(base, altura, forma = 'R') {
  switch(forma) {
    case 'R':     // Retângulo
      return base * altura
    case 'T':     // Triângulo
      return base * altura / 2
    case 'E':     // Elipse
      return (base / 2) * (altura / 2) * Math.PI
    default:      // Forma inválida/desconhecida
      return null
  }
}

console.log('Triângulo 10x30:', calcArea(10, 30, 'T'))
console.log('Elipse (círculo) 7,5x7,5:', calcArea(7.5, 7.5, 'E'))
console.log('Retângulo 8x15:', calcArea(8, 15, 'R'))
console.log('Forma inválida 12x18:', calcArea(12, 18, 'X'))

// Cálculo da área de uma forma passando apenas dois parâmetros
// A função irá entender que é para fazer o cálculo da área de um RETÂNGULO
console.log('Retângulo 7x16:', calcArea(7, 16))

/*
  Regras para o uso de parâmetros predefinidos em funções
  1. O parâmetro predefinido deve vir sempre POR ÚLTIMO na lista de parâmetros
  2. Pode haver mais de um parâmetro predefinido, mas eles devem ser sempre os
     últimos na lista de parâmetros
*/