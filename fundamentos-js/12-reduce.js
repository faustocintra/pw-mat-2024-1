// Vetores para teste
const nums = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
const nomes = ['Aurival', 'Joender', 'Neurivânia', 'Terebintina', 'Leucimara']

/*
  reduce() é um método que REDUZ, um vetor a um único valor.
  Para isso, aplica uma função a cada elemento do vetor,
  a qual efetua uma transformação e acumula o resultado a
  cada passada.
*/

// reduce() para somar todos os elementos do vetor de números
const soma = nums.reduce((acumulador, elemento) => acumulador + elemento)

console.log('Soma dos números do vetor:', soma)

// reduce() para colocar em maiúsculas e concatenar com vírgulas
// intercaladas os elementos do vetor nomes

let resultado = nomes.reduce(
  (acum, el) => acum.toUpperCase() + ', ' + el.toUpperCase()
)

console.log('Lista de nomes separados por vírgula:', resultado)