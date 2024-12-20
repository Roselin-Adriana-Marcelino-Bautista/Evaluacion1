import React from 'react';
import axios from 'axios';
import { useState, useEffect} from 'react';
import Pedidos from './Pedidos';


 const Orden = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [DatosB, setDatosB] = useState([]);

  useEffect(() => {
    axios.get('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming')
      .then(response => {
        setData(response.data);
        setLoading(false);
        console.log(response.data);
        console.log(response.data.result[0].destinations[0].address);


        
        setDatosB(getAddress(response.data.result));

        console.log("DatosB",DatosB)

        
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (DatosB.length > 0) {
      console.log(DatosB); 
    }
  }, [DatosB]);  

  function getValue (address) {

      const dataArray = address.split(", ");
      
      const jsonData =  dataArray[dataArray.length - 1].trim();

      console.log(jsonData);
      return(jsonData);
  } 


  function getAddress (informacion){

    const nuevoItem = [...informacion];

      for (let i= 0; i<informacion.length; i++) {
          const DirO = informacion[i].destinations[0].address;
          const DirD = informacion[i].destinations[1].address;

          const textoO = getValue(informacion[i].destinations[0].address);
          const textoD = getValue(informacion[i].destinations[1].address);

          const dateObject = new Date(informacion[i].start_date);
          const fechaOr = dateObject.toLocaleDateString();
          const horaOr =  dateObject.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false});

          const dateObjectD = new Date(informacion[i].end_date);
          const fechaDe = dateObjectD.toLocaleDateString();
          const horaDe = dateObjectD.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false});
          

          nuevoItem[i] = {...nuevoItem[i], origen : textoO , destino : textoD, fechaO : fechaOr, horaO : horaOr, fechaD : fechaDe, horaD : horaDe, direccionOr : DirO, direccionDe : DirD};
          //nuevoItem[i] = {...nuevoItem[i], destino : textoD , destino : textoD};

         // console.log(textoO);

          
      } 

      //setDatosB(nuevoItem);
      console.log("NUEVOITEMM", nuevoItem);
      return nuevoItem;
     

  }

 /*function agregarKey  (value) {
    setInfo(prevInfo =>  ({...prevInfo, origen: value, }));
  }*/

  if (loading) {
    return <div>Cargando...</div>;
  }

  
  console.log("Hola ", DatosB)



  return (
    <div className="container mt-5">
      {DatosB.length === 0 ? (
        <p>No hay datos disponibles</p>
      ) : (
        DatosB.filter((item) =>
          item.order_number &&
          item.origen &&
          item.destino)
          .map((item) => (
            <Pedidos
              key={item._id}
              order={item.order_number}
              type={item.type}
              status_string={item.status_string}
              origen={item.origen}
              destino={item.destino}
              origenD={item.direccionOr}
              destinoD={item.direccionDe}
              fechaO={item.fechaO}
              horaO={item.horaO}
              fechaD={item.fechaD}
              horaD={item.horaD}
            />
          ))
          
      )
      }
    </div>
  );
 }  
export default Orden;


