import Titulo from './Nav/Titulo';
import Nav from './Nav/Nav';

import React from 'react'
import Orden from './Ordenes/Orden';
import Pedidos from './Ordenes/Pedidos';
import { DetalleOrden } from './Ordenes/DetalleOrden';
import Destinos from './Ordenes/Destinos';

export const SegundaPagina = () => {
  return (
    <div>
        <Titulo></Titulo>
        <DetalleOrden></DetalleOrden>
        
    </div>
  )
}

export default SegundaPagina;
