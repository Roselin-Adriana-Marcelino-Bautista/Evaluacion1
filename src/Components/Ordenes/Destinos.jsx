import React, { useState, useEffect } from 'react';
import DetalleDestinos from './DetalleDestinos';
import axios from 'axios';

export const Destinos = () => {
  const [destin, setDestin] = useState(null); 
  const avatarUrl = 'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369991.png';

  useEffect(() => {
    axios
      .get('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders')
      .then((response) => {
        setDestin(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);


  if (!destin || !destin.result || !destin.result.driver) {
    return <p>Cargando información...</p>;
  }

  const date = new Date(destin.result.driver.date_created || Date.now());
  const hora = date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
    <div>
      <div className="row">
        <div className="row">
          <label className="col-md-12">
            <img
              src={avatarUrl}
              alt="Avatar"
              style={{
                width: '200px', 
                height: '200px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </label>
        </div>

        <div className="row">
          <label className="col-md-6">{hora}</label>
        </div>

        {/*  destinos */}
        <div className="container mt-5">
          {destin.result.destinations && destin.result.destinations.length > 0 ? (
            destin.result.destinations.map((item, index) => (
              <DetalleDestinos
                key={index}
                icono={item.active} 
                texto={item.status_string}
              />
            ))
          ) : (
            <p>No hay destinos disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinos;
