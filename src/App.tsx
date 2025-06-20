import viteLogo from '/vite.svg'
import './App.css'
import UserForm from './modules/user/UserForm'
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom'
import MenuComponent from './modules/MenuComponent'
import Dasboard from './modules/dashboard/dashboard'
import routes from './core/menuRoutes'

function App() {
  const [count, setCount] = useState(0)

  const handlerClick = () => {
    setCount((count) => count + 1)
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dasboard />}>
            {routes.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
