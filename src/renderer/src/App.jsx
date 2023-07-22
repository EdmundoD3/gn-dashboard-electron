// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './Component/Header'
import RoutesApp from './Pages/Routes'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <RoutesApp />
      </div>
    </div>
  )
}

export default App
