import * as React from 'react'

function Greeting({initialName}) {
  // 💣 exclua esta declaração de variável e troque por uma chamada a React.useState
  //const name = ''
  //const [name, setName] = React.useState('')
  const [name, setName] = React.useState(initialName)

  function handleChange(event) {
    // 🐨 atualize o nome aqui baseado em event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Nome: </label>
        {/* 
          Diz-se que um componente é CONTROLADO quando, além de atualizar
          sua variável de estado, mudanças externas na variável de estado
          também se refletem no componente. Isso é feito atribuindo-se o
          valor da prop 'value' à própria variável de estado.
        */}
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Olá {name}</strong> : 'Por favor, informe seu nome'}
    </div>
  )
}

function Exercicio01() {
  return Greeting({initialName: "Juventina"})
}

export default Exercicio01