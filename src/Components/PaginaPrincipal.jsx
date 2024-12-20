import Titulo from './Nav/Titulo';
import Nav from './Nav/Nav';

import React from 'react'
import Orden from './Ordenes/Orden';
import Pedidos from './Ordenes/Pedidos';

export const PaginaPrincipal = () => {
  return (
    <div>
        <Titulo></Titulo>
        <Nav></Nav>
        <Orden></Orden>
        <Pedidos></Pedidos>
    </div>
  )
}

export default PaginaPrincipal;
