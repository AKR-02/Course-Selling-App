import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Nav from "./components/homecomponents/Nav.jsx";


function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
