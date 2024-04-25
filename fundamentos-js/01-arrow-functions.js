/* 
  Função tradicional com 1 parâmetro e 1 linha de corpo
  contendo return
*/

function quadrado(n) {
  return n * n
}

console.log('Função tradicional:', quadrado(12))

/* Função equivalente, usando a sintaxe de arrow function 
  ~> não necessita de chaves
  ~> não necessita de parênteses em torno do parâmetro
  ~> não necessita da palavra-chave return
  ~> a palavra-chave function é substituída pela flecha =>
     LOGO APÓS o parâmetro
  ~> a arrow function invocada pela nome da constante que
     a recebe
*/
const quadradoA = n => n * n

console.log('Arrow function:', quadradoA(12))

/*
  Função tradicional com mais de um parâmetro e uma única
  linha de corpo contendo return
*/
function calc(a, b, c) {
  return a * b + c
}

console.log('Função tradicional:', calc(10, 20, 30))

/* Equivalente na sintaxe arrow function
   ~> Quando o número de parênteses é != 1, os parênteses
      voltam a ser obrigatórios
*/
const calcA = (a, b, c) => a * b + c

console.log('Arrow function:', calcA(10, 20, 30))

/*
  Função tradicional sem parâmetros e uma única linha de corpo
  contendo return
*/
function msgErro() {
  return 'ERRO FATAL!!!'
}

console.log('Função tradicional:', msgErro())

/* Equivalente na sintaxe arrow function
   ~> Com zero parâmetros, os parênteses vazios são obrigatórios
*/
const msgErroA = () => 'ERRO FATAL!!!'

console.log('Arrow function:', msgErroA())

/*
  Função tradicional com um parâmetro e mais de uma linha de corpo
*/
function fatorial(n) {
  let resultado = 1
  for(let i = n; i > 1; i--) resultado *= i
  return resultado
}

console.log('Função tradicional:', fatorial(7))

/* Equivalente na sintaxe arrow function
   ~> Não há economia de linhas no corpo da função
   ~> As chaves voltam a ser obrigatórias
*/
const fatorialA = n => {
  let resultado = 1
  for(let i = n; i > 1; i--) resultado *= i
  return resultado
}

console.log('Arrow function:', fatorialA(7))