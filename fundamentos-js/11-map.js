// Vetores para teste
const nums = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
const nomes = ['Aurival', 'Joender', 'Neurivânia', 'Terebintina', 'Leucimara']

/*
  O método map() cria um NOVO VETOR, de tamanho IDÊNTICO ao do vetor original,
  em que cada elemento corresponde a uma transformação feita, no vetor de
  origem, pela função passada como parâmetro
*/

// map() que cria um novo vetor em que cada elemento corresponde ao dobro
// do valor do elemento do vetor original
let dobro = nums.map(n => n * 2)

console.log('Vetor original:', nums)
console.log('Vetor com dobros:', dobro)

// map() que transforma os elementos do vetor original em itens de uma lista
// para uso em uma página HTML
const itensLista = nomes.map(nome => `<li> ${nome} </li>`)
console.log(itensLista)

console.log('<h1>Nomes mais bonitos do Brasil</h1>')
console.log('<ul>')
for(let i of itensLista) console.log(i)
console.log('</ul>')