import * as React from 'react'

function Board() {
  // 🐨 squares é o estado para este componente. Adicione useState para squares
  const squares = Array(9).fill(null)

  // 🐨 Precisaremos dos seguintes itens de estados derivados:
  // - nextValue ('X' ou 'O')
  // - winner ('X', 'O', ou null)
  // - status (`Vencedor: ${winner}`, `Deu velha!`, or `Próximo jogador: ${nextValue}`)
  // 💰 Os respectivos cálculos já estão prontos. Basta usar os utilitários 
  // mais abaixo no código para criar essas variáveis

  // Esta é a função que o manipulador de clique no quadrado irá chamar. `square`
  // deve ser um índice. Portanto, se você clicar sobre o quadrado central, o
  // valor será `4`.
  function selectSquare(square) {
    // 🐨 primeiramente, se já existe um vencedor ou já há um valor no
    // quadrado indicado pelo índice (como quando alguém clica em um quadrado
    // que já foi clicado), retorne prematuramente, assim não precisaremos
    // fazer quaisquer mudanças de estado
    if(winner || squares[square]) return

    // 🦉 Tipicamente, é uma má ideia mudar ou alterar diretamente um estado
    // em React. Isso pode levar a bugs sutis que podem facilmente ir parar
    // em produção.
    //
    // 🐨 faça uma cópia da matriz dos quadrados
    // 💰 `[...squares]` é do que você precisa!)
    
    // 🐨 ajuste o valor do quadrado que foi selecionado
    // 💰 `squaresCopy[square] = nextValue`
    
    // 🐨 atribua a cópia à matriz dos quadrados
  }

  function restart() {
    // 🐨 volte os quadrados ao estado inicial
    // 💰 `Array(9).fill(null)` é do que você precisa!
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 coloque o status na div abaixo */}
      <div className="status"></div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
      <hr />
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Vencedor: ${winner}`
    : squares.every(Boolean)
    ? `Deu velha!`
    : `Próximo jogador: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Exercicio04() {
  return <Game />
}

export default Exercicio04