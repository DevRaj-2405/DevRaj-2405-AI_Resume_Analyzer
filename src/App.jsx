import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Report from './pages/Report';

function App() {
 

  return (
    <>

    <BrowserRouter>

    <Navbar/>
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/report" element={<Report/>} />
      
    </Routes>
    
   

    </BrowserRouter>
    </>
  )
}

export default App
