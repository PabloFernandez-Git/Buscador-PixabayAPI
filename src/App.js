import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  // state de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  // useEffect
  useEffect(() => {
    const consultarApi = async () => {
      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '17227505-5144ca8b6bc9b6f90b7a60061';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
  
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      
      guardarImagenes(resultado.hits);

      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina );
      guardarTotalPaginas(calcularTotalPaginas);
    }
    consultarApi();

  }, [busqueda])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>

        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />
      </div>    
    </div>
  );
}

export default App;
