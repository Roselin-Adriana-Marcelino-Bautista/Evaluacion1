import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DetalleDestinos from './DetalleDestinos';

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
      setInformacion(JSON.parse(data)); // Recuperar y parsear la información
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

  // Verificar si `detalleOrden` tiene datos antes de acceder a sus propiedades
  if (!detalleOrden || !detalleOrden.result) {
    return <p>Cargando información...</p>;
  }

  // Variables para el renderizado seguro
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
      {/* Contenedor principal */}
      <div className="container">
        {/* Referencia y orden */}
        <div className="row">
          <label className="col-md-12">Referencia: {referencia}</label>
        </div>
        <div className="row">
          <label className="col-md-12">Order #: {informacion.order || 'N/A'}</label>
        </div>

        {/* Pickup 
        <button onClick={() => validar("pickup")}>*/}
            <div className="row" onClick={() => validar("pickup")}>
                <small className="col-md-12">Pickup</small>
                <div className="row">
                    <label className="col-md-6">
                    <span className="fa fa-truck"></span> {informacion.origen || 'N/A'}
                    </label>
                </div>
                <div className="row">
                    <label className="col-md-6">{informacion.direccionO || 'N/A'}</label>
                </div>
                <div className="row">
                    <label className="col-md-6">
                    {estado1 === 'Aceptada' ? (
                        <i className="bi bi-record-fill" style={{ color: 'blue' }}></i>
                    ) : (
                        <i className="bi bi-record-fill" style={{ color: 'gray' }}></i>
                    )}
                    {estado1}
                    </label>
                </div>
            </div>
        {/* </button>
        

        Dropoff 
        <button>*/}
            <div className="row" onClick={() => validar("dropoff")}>
                <small className="col-md-12">Dropoff</small>
                <div className="row">
                    <label className="col-md-6">
                    <span className="ti-marker"></span> {informacion.destino || 'N/A'}
                    </label>
                </div>
                <div className="row">
                    <label className="col-md-6">{informacion.direccionD || 'N/A'}</label>
                </div>
                <div className="row">
                    <label className="col-md-6">
                    {estado2 === 'Aceptada' ? (
                        <i className="bi bi-record-fill" style={{ color: 'blue' }}></i>
                    ) : (
                        <i className="bi bi-record-fill" style={{ color: 'gray' }}></i>
                    )}
                    {estado2}
                    </label>
                </div>
            </div>
            </div>




            {/* Movimientos */}
                {formulario !== null && (
                    <div>
                        <div>
                              <div className="row">
                                {/* Imagen del avatar */}
                                <div className="row">
                                  <label className="col-md-12">
                                    <img
                                      src={avatarUrl}
                                      alt="Avatar"
                                      style={{
                                        width: '300px', // Ajusta el tamaño de la imagen
                                        height: '300px',
                                        borderRadius: '50%', // Hace que sea circular
                                        objectFit: 'cover', // Ajusta la imagen al contenedor
                                      }}
                                    />
                                  </label>
                                </div>
                        
                                {/* Hora del conductor */}
                                <div className="row">
                                  <label className="col-md-6">{horaC}</label>
                                </div>
                        
                                {/* Lista de destinos */}
                                <div className="container mt-5">

                                      {/* Encabezados */}
                                        <div className="row">
                                            <label className="col-md-4">Estado</label>
                                            <label className="col-md-4">Texto</label>
                                        </div>
                                        
                                        {/* Validar y Renderizar Dinámicamente */}
                                        {detallePickup !== null && detallePickup.map((element, index) => (
                                            <label className="col-md-12" key={index}>
                                                <i className={element.active ? 'fa fa-circle' : 'fa fa-car'}></i> {element.status}
                                            </label>
                                        ))}

                                    <div class="row">
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            id="cancel_conf"
                                            disabled={statusC < 3}
                                            >
                                            Track Order
                                        </button>    
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
      
        {/*  </button>

        </div>
        

      Footer */}
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Pickup Data
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="row">
                <label className="col-md-12">{detalleOrden.result.driver?.nickname || 'N/A'}</label>
              </div>
              <div className="row">
                <label className="col-md-6">{fechaConductor}</label>
                <label className="col-md-4">{horaC}</label>
              </div>
              <div className="row">
                <label className="col-md-12">{detalleOrden.result.driver?.telephone || 'N/A'}</label>
              </div>
              <div className="row">
                <label className="col-md-12">{detalleOrden.result.driver?.email || 'N/A'}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
