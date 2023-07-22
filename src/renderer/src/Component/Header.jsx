import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="App-header">
      <nav className="navigator">
        <Link to="/">HOME </Link>
        <br />
        <Link to="/clientes">CLIENTES</Link>
        <br />
      </nav>
    </header>
  )
}
