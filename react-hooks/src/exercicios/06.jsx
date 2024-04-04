import * as React from 'react'
// 🐨 você vai precisar dos seguintes itens de '../pokemon':
// fetchPokemon: a função que retorna as informações do pokémon
// PokemonInfoFallback: o que é exibido enquanto as informações do pokémon
// são carregadas
// PokemonDataView: o componente usado para exibir as informações do pokémon
import { fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm } from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 crie o estado para o pokémon (null)
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)
  // const [status, setStatus] = React.useState('idle')

  // Criando uma única variável de estado, do tipo objeto, com
  // a mesma funcionalidade de três variáveis de estado avulsas
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle'
  })
  // Usando desestruturação para obter versões somente-leitura das
  // propriedades da variável de estado
  const { pokemon, error, status } = state

  // 🐨 crie React.useEffect de modo a ser chamado sempre que pokemonName mudar.
  // 💰 NÃO SE ESQUEÇA DO VETOR DE DEPENDÊNCIAS!
  React.useEffect(() => {
    // 💰 se pokemonName é falso (ou uma string vazia) não se preocupe em fazer 
    // a requisição (retorne precocemente).
    if(! pokemonName) return

    // 🐨 antes de chamar `fetchPokemon`, limpe o estado atual do pokemon
    // ajustando-o para null.
    // setPokemon(null)
    // setError(null)
    // setStatus('pending')
    setState({ pokemon: null, error: null, status: 'pending' })

    // (Isso é para habilitar o estado de carregamento ao alternar entre diferentes
    // pokémon.)
    // 💰 Use a função `fetchPokemon` para buscar um pokémon pelo seu nome:
    //   fetchPokemon('Pikachu').then(
    //     pokemonData => {/* atualize todos os estados aqui */},
    //   )
    fetchPokemon(pokemonName)
      .then(    // Callback de sucesso
        pokemonData => {
          // setPokemon(pokemonData)
          // setStatus('resolved')
          setState({ ...state, pokemon: pokemonData, status: 'resolved' })
        }
      )
      .catch(   // Callback de falha
        error => {
          // setError(error)
          // setStatus('rejected')
          setState({ ...state, error, status: 'rejected' })
        }
      )

  }, [pokemonName])

  React.useEffect(() => {
    console.count('Componente atualizou')
  }) // Sem vetor de dependências vazio para executar a cada atualização

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  // 🐨 retorne o seguinte baseado nos estados `pokemon` e `pokemonName`:
  //   1. não há pokemonName: 'Informe um pokémon'
  //   2. tem pokemonName mas não pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. tem pokemon: <PokemonDataView pokemon={pokemon} />
  // if(error) return (
  //   <div role="alert">
  //     Houve um erro: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
  //   </div>
  // )
  // if(! pokemonName) return 'Informe um pokémon'
  // if(pokemonName && ! pokemon) return <PokemonInfoFallback name={pokemonName} />
  // if(pokemon) return <PokemonDataView pokemon={pokemon} />

  switch(status) {
    case 'idle':
      return 'Informe um pokémon'

    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />

    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />

    default:  // 'rejected'
      return (
        <div role="alert">
          Houve um erro: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
        </div>
      )
  }
  
}

function Exercicio06() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default Exercicio06