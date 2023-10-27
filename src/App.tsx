import React from "react"
import { Route, Routes } from "../node_modules/react-router-dom/dist/index"
import { ShoppingCartProvider } from "./Components/context/ShoppingCartProvider"
import { Navbar } from "./Components/Navbar"
import { About } from "./pages/About"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import "./app.css";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/store' element={<Store />} />
        </Routes>
      </ShoppingCartProvider>
    </>
  )
}

export default App
