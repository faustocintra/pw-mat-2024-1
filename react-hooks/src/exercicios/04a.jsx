import React from 'react'

export default function Exercicio04a() {
  
  const [a, setA] = React.useState(0)
  const [b, setB] = React.useState(0)
  const [c, setC] = React.useState(0)
  //const [raiz, setRaiz] = React.useState(undefined)

  function handleChange(e) {
    switch(e.target.id) {
      case 'a':
        setA(Number(e.target.value))
        break
      case 'b':
        setB(Number(e.target.value))
        break
      default:  // 'c'
        setC(Number(e.target.value))
    }
  }

  function calcularRaiz() {
    let result

    // Cálculo das raízes
    const delta = (b ** 2) - (4 * a * c)

    if(delta < 0) {
      result = null   // Não há raiz possíveis
    }
    else if(delta === 0) {
      result = -b / 2 * a   // Só tem uma raiz
    }
    else {
      result = []     // Duas raízes
      result.push((-b + Math.sqrt(delta)) / 2 * a)
      result.push((-b - Math.sqrt(delta)) / 2 * a)
    }

    return result
  }

  // ESTADO CALCULADO
  // Um estado calculado é uma VARIÁVEL COMUM que recebe o
  // resultado de um cálculo feito com variáveis de estado
  const raiz = calcularRaiz()

  return(
    <>
      <h1>Resolução de equação do 2º grau</h1>
      <p>
        <input id="a" type="number" value={a} onChange={handleChange} />
        x² + 
        <input id="b" type="number" value={b} onChange={handleChange} />
        x + 
        <input id="c" type="number" value={c} onChange={handleChange} />
         = 0
      </p>
      <p>Solução: {JSON.stringify(raiz)}</p>
    </>
  )

}