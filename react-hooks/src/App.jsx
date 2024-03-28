import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Exercicio01 from './exercicios/01'
import Exercicio02 from './exercicios/02'
import Exercicio03 from './exercicios/03'
import Exercicio04a from './exercicios/04a'
import Exercicio04 from './exercicios/04'

function App() {
  return (
    <>
      <h1>Exercícios React Hooks</h1>
      <BrowserRouter>
        <ul>
          <li> <Link to="/01">Exercício 01</Link> </li>
          <li> <Link to="/02">Exercício 02</Link> </li>
          <li> <Link to="/03">Exercício 03</Link> </li>
          <li> <Link to="/04a">Exercício 04a</Link> </li>
          <li> <Link to="/04">Exercício 04</Link> </li>
        </ul>
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/01" element={<Exercicio01 />} />
          <Route path="/02" element={<Exercicio02 />} />
          <Route path="/03" element={<Exercicio03 />} />
          <Route path="/04a" element={<Exercicio04a />} />
          <Route path="/04" element={<Exercicio04 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
