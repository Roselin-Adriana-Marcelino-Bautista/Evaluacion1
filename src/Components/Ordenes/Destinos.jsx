import React, { useState, useEffect } from 'react';
import DetalleDestinos from './DetalleDestinos';
import axios from 'axios';

export const Destinos = () => {
  const [destin, setDestin] = useState(null); // Cambiar a null para validar antes de usar
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

  // Verificar si los datos están disponibles antes de acceder a las propiedades
  if (!destin || !destin.result || !destin.result.driver) {
    return <p>Cargando información...</p>;
  }

  // Procesar datos
  const date = new Date(destin.result.driver.date_created || Date.now());
  const hora = date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
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
          <label className="col-md-6">{hora}</label>
        </div>

        {/* Lista de destinos */}
        <div className="container mt-5">
          {destin.result.destinations && destin.result.destinations.length > 0 ? (
            destin.result.destinations.map((item, index) => (
              <DetalleDestinos
                key={index} // Usar un índice temporal si no hay un identificador único
                icono={item.active} // Ajusta según los datos disponibles
                texto={item.status_string} // Ajusta según los datos disponibles
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
