
import React from 'react'
import Orden from './Ordenes/Orden';
import Pedidos from './Ordenes/Pedidos';
import { DetalleOrden } from './Ordenes/DetalleOrden';
import Titulo2 from './Nav/Titulo2';

export const SegundaPagina = () => {
  return (
    <div>
        <Titulo2></Titulo2>
        <DetalleOrden></DetalleOrden>
        
    </div>
  )
}

export default SegundaPagina;
