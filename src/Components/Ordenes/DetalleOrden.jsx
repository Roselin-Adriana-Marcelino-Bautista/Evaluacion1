import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetalleDestinos from './DetalleDestinos';
import './detail.css';

export const DetalleOrden = () => {
  const [informacion, setInformacion] = useState([]);
  const [detalleOrden, setDetalleOrden] = useState(null);
  const [detallePickup, setDetallePickup] = useState(null);

  //const [statusC, setstatusC] = useState(null);

  const [formulario, setFormulario] = useState(null);
  const avatarUrl = 'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369991.png';

  useEffect(() => {
    const data = localStorage.getItem('informacion');
    if (data) {
      setInformacion(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    axios
      .get('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders')
      .then((response) => {
        setDetalleOrden(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  
  if (!detalleOrden || !detalleOrden.result) {
    return <p>Cargando información...</p>;
  }

  const referencia = detalleOrden.result.reference_number || 'N/A';
  const estado1 = detalleOrden.result.destinations?.[0]?.status_string || 'N/A';
  const estado2 = detalleOrden.result.destinations?.[1]?.status_string || 'N/A';

  const date = new Date(detalleOrden.result.driver?.date_created || Date.now());
  const fechaC = date.toLocaleDateString();
  const horaC = date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  function convertirFecha(fecha) {
    const [mes, dia, anio] = fecha.split('/').map(Number);
    const fechaBC = new Date(anio, mes - 1, dia);

    const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
    return fechaBC.toLocaleDateString('es-ES', opciones);
  }

  const fechaConductor = convertirFecha(fechaC);

  function validar (valor) {
            
    console.log(valor)
    if(valor== "pickup"){
       console.log("pickup", detalleOrden.result.status_list.pickup)
       setFormulario("pickup");
       setDetallePickup(detalleOrden.result.status_list.pickup)
       
    }else {
        console.log("dropoff", detalleOrden.result.status_list.dropoff)
        setFormulario("dropoff");
        setDetallePickup(detalleOrden.result.status_list.dropoff)
    }
}


    /*setstatusC( detalleOrden.result.status)*/
    const statusC = (detalleOrden.result.status || 'N/A');

    console.log(statusC);

  return (
    <div>
      <div class="container cont">
          <div class="row">
              <label class="col-12 subtitle2">Referencia: {referencia}</label>
          </div>
          <div class="row">
              <label class="col-12 title">Order #: {informacion.order || 'N/A'}</label>
          </div>
          <div class="container">
              <div class="row">
                  <div class="col-2 icon-container">
                      <label class="icon"><i class="fa fa-truck"></i> </label>
                      <label class="icon2"><i class="fa fa-circle"></i> </label>
                  </div>
                  <div class="col-10">
                      <div onClick={() => validar("pickup")}>
                          <div class="row">
                              <label class="subtitle">PICKUP</label>
                          </div>
                          <div class="row">
                              <label class="text"> {informacion.origen || 'N/A'} </label>
                          </div>
                          <div class="row">
                              <label class="subtitle">{informacion.direccionO || 'N/A'}</label>
                          </div>
                          <div class="row">
                              <label class="status">
                              {estado1 === 'Aceptada' ? (
                                  <i class="bi bi-record-fill" style={{ color: '#117AE8' }}></i>
                              ) : (
                                  <i class="bi bi-record-fill" style={{ color: 'gray' }}></i>
                              )}
                              {estado1}
                              </label>
                          </div>
                      </div>
                      <div onClick={() => validar("dropoff")}>
                          <div class="row">
                              <label class="subtitle">DROPOFF</label>
                          </div>
                          <div class="row">
                              <label class="text">{informacion.destino || 'N/A'}</label>
                          </div>
                          <div class="row">
                              <label class="subtitle">{informacion.direccionD || 'N/A'}</label>
                          </div>
                          <div class="row">
                              <label class="status">
                                  {estado2 === 'Aceptada' ? (
                                      <i class="bi bi-record-fill" style={{ color: '#117AE8' }}></i>
                                  ) : (
                                      <i class="bi bi-record-fill" style={{ color: 'gray' }}></i>
                                  )}
                                  {estado2}
                              </label>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
      {formulario !== null && (
          <div>
              <div>
                  <div class="container-foto cont">
                      <div class="row">
                          <label class="col-12">
                              <img src={avatarUrl} alt="Avatar" style={{width: '300px', height: '300px', borderRadius: '50%', objectFit: 'cover'}}/>
                          </label>
                      </div>
                      <div class="row">
                          <label class="col-6">{horaC}</label>
                      </div>
                      <div class="container mt-5">
                          {detallePickup !== null && detallePickup.map((element, index) => (
                              <label class="col-12" key={index}>
                                  <i class={element.active ? 'fas fa-check-circle' : 'fa fa-circle'}></i> {element.status}
                              </label>
                          ))}
                          <div class="row">
                              <button type="button" class="btn fuente-boton" id="cancel_conf" disabled={statusC < 3} >Track Order </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}
      
      <div class="accordion" id="accordionExample">
          <div class="accordion-item">
              <h2 class="accordion-header">
                  <button class="accordion-button color-general" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" /*aria-expanded="true" aria-controls="collapseOne"*/>
                      Pickup Data
                  </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div class="accordion-body container-pickup">
                      <div class="row">
                          <label class="col-12">{detalleOrden.result.driver?.nickname || 'N/A'}</label>
                      </div>
                      <div class="row">
                          <label class="col-6">{fechaConductor}</label>
                          <label class="col-4">{horaC}</label>
                      </div>
                      <div class="row">
                          <label class="col-12">{detalleOrden.result.driver?.telephone || 'N/A'}</label>
                      </div>
                      <div class="row">
                          <label class="col-12">{detalleOrden.result.driver?.email || 'N/A'}</label>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  );
};
