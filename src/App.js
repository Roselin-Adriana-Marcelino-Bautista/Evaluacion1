import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';






import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Titulo from './Components/Nav/Titulo';
import { PaginaPrincipal } from './Components/PaginaPrincipal';
import Orden from './Components/Ordenes/Orden';
import Pedidos from './Components/Ordenes/Pedidos';
import SegundaPagina from './Components/SegundaPagina';
import Destinos from './Components/Ordenes/Destinos';
import DetalleDestinos from './Components/Ordenes/DetalleDestinos';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Nav" element={<Nav />} />
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/Titulo" element={<Titulo />} />
        <Route path="/Orden" element={<Orden />} />
        <Route path="/Pedidos" element={<Pedidos />} />
        <Route path="/Pagina2" element={<SegundaPagina />} />
        <Route path="/Destinos" element={<Destinos />} />
        <Route path="/DestalleDestinos" element={<DetalleDestinos />} />
      </Routes>
    </Router>
      
  );
}

export default App;
