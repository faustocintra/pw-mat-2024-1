import * as React from 'react'
// 🐨 você vai precisar dos seguintes itens de '../pokemon':
// fetchPokemon: a função que retorna as informações do pokémon
// PokemonInfoFallback: o que é exibido enquanto as informações do pokémon
// são carregadas
// PokemonDataView: o componente usado para exibir as informações do pokémon
import { fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm } from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 crie o estado para o pokémon (null)
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)

  // 🐨 crie React.useEffect de modo a ser chamado sempre que pokemonName mudar.
  // 💰 NÃO SE ESQUEÇA DO VETOR DE DEPENDÊNCIAS!
  React.useEffect(() => {
    // 💰 se pokemonName é falso (ou uma string vazia) não se preocupe em fazer 
    // a requisição (retorne precocemente).
    if(! pokemonName) return

    // 🐨 antes de chamar `fetchPokemon`, limpe o estado atual do pokemon
    // ajustando-o para null.
    setPokemon(null)
    setError(null)

    // (Isso é para habilitar o estado de carregamento ao alternar entre diferentes
    // pokémon.)
    // 💰 Use a função `fetchPokemon` para buscar um pokémon pelo seu nome:
    //   fetchPokemon('Pikachu').then(
    //     pokemonData => {/* atualize todos os estados aqui */},
    //   )
    fetchPokemon(pokemonName)
      .then(    // Callback de sucesso
        pokemonData => setPokemon(pokemonData)
      )
      .catch(   // Callback de falha
        error => setError(error)
      )

  }, [pokemonName])

  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  // 🐨 retorne o seguinte baseado nos estados `pokemon` e `pokemonName`:
  //   1. não há pokemonName: 'Informe um pokémon'
  //   2. tem pokemonName mas não pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. tem pokemon: <PokemonDataView pokemon={pokemon} />
  if(error) return (
    <div role="alert">
      Houve um erro: <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
    </div>
  )
  if(! pokemonName) return 'Informe um pokémon'
  if(pokemonName && ! pokemon) return <PokemonInfoFallback name={pokemonName} />
  if(pokemon) return <PokemonDataView pokemon={pokemon} />
  
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