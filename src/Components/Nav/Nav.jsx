import React from 'react';
import './Nav.css';
import  { useState, useEffect } from 'react';
import axios from 'axios';


function Nav() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (query) {
        try {
          const response = await axios.get('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming');
          setResults(response.data.result);
          //console.log("results", response.data.result)
        } catch (error) {
          console.error('Error al realizar la búsqueda', error);
        }
            
      } else {
        setResults([]);
      }
    };
    console.log("results", results);

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300); // Espera 300ms antes de realizar la búsqueda

    return () => clearTimeout(delayDebounceFn); // Cancela el temporizador si el efecto se vuelve a ejecutar
    }, [query]);

    console.log(query)

    const filteredResults = results.filter(item =>
        item.order_number.toLowerCase().startsWith(query.toLowerCase())
      );
      
      console.log(filteredResults);

    return (
    
            
            <div >

                <nav class="navbar editNav bg-dark navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Upcoming</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Completed</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link active" aria-current="page" href="#">Past</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <div className="input-group">
                            <span className="input-group-text bg-dark text-white">
                                <i className="bi bi-search"></i>
                            </span>
                            <input
                                className="form-control bg-dark text-white "
                                type="search"
                                aria-label="Search"
                                placeholder="Busca aquí..." 
                                value={query} 
                                onChange={(e) => setQuery(e.target.value)} 
                            />
                            {/*<div>
                                {results.map((result, index) => (
                                <div key={index}>
                                    <h3>{result.title}</h3>
                                    <p>{result.description}</p>
                                </div>
                                ))}
                            </div>*/}
                        </div>

                    </form>
                    </div>
                </div>
                </nav>
                
            </div>

        
    );
  }
  
  export default Nav;
  
