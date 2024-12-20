import React from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './StylesP.css'


const Pedidos = ( { order, type, status_string, origen, destino, origenD, destinoD, fechaO, horaO, fechaD, horaD }) => {

    const navigate = useNavigate();

    if (!order || !origen || !destino) {
        return null; 
      }

      const handleClick = () => {
        const data = { 
          order, 
          origen, 
          destino, 
          direccionO: origenD, 
          direccionD: destinoD,
          fechaO,
          horaO,
          fechaD,
          horaD
        }; 
        
        localStorage.setItem('informacion', JSON.stringify(data));
        navigate('/Pagina2'); 
        //console.log(data)
      };
      

return (
    <div>
        <div class="container">
            <div class="row">
                <label class="col-12 mb" > Order <span class="title">{order}</span></label>
            </div>
        </div>
        <div class="container">
            <div class="row conta-order">
                <label class="col-9"><i class="fa fa-trailer"></i> {type} </label>
                <label class="col-3 date"><i class="fa fa-circle"></i>{status_string}</label>
            </div>
            <div class="container cont">
                    <label class="col-12 subtitle pdrop"> PICKUP </label>
                    <div class="row">
                        <label class="col-9"><i class="fa fa-truck"></i> {origen} </label>
                        <label class="col-3 subtitle"> {fechaO} </label>
                    </div>
                    <div class="row">
                        <label class="col-9 subtitle pd"> {origenD} </label>
                        <label class="col-3 date"> {horaO} </label>
                    </div>
                    <label class="col-12 subtitle pdrop"> DROPOFF </label>
                    <div class="row">
                        <label class="col-9"><i class="fas fa-map-marker-alt"></i> {destino} </label>
                        <label class="col-3 subtitle"> {fechaD} </label>
                    </div>
                    <div class="row">
                        <label class="col-9 subtitle pd"> {destinoD} </label>
                        <label class="col-3 date"> {horaD} </label>
                    </div>
                <div class="row">
                    <button type="button" class="btn left" id="cancel_conf">Its time for pickup</button>
                    <button onClick={handleClick} type="button" class="btn rigth" id="cancel_conf">Resume<i class="fa fa-eye eye"></i></button>
                </div>
            </div>
        </div>
    </div>
);

};
  
Pedidos.propTypes = {
    order: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status_string: PropTypes.string.isRequired,
    origen: PropTypes.string.isRequired,
    destino: PropTypes.string.isRequired,
    origenD: PropTypes.string.isRequired,
    destinoD: PropTypes.string.isRequired,
    fechaO: PropTypes.string.isRequired,
    horaO: PropTypes.string.isRequired,
    fechaD: PropTypes.string.isRequired,
    horaD: PropTypes.string.isRequired,

  
};



export default Pedidos;