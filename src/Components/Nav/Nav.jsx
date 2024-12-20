import React from 'react';
import './Nav.css';
import  { useState, useEffect } from 'react';
import axios from 'axios';


function Nav() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const [active, setActive] = useState('Upcoming');

    const handleSetActive = (option) => {
      setActive(option);
    };

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
    }, 300);

    return () => clearTimeout(delayDebounceFn); 
    }, [query]);

    console.log(query)

    const filteredResults = results.filter(item =>
        item.order_number.toLowerCase().startsWith(query.toLowerCase())
      );
      
      console.log(filteredResults);

    return (
    
            
            <div >

      {/**Nuevi Nav */}
      <div class="contenedor">
            {/*<div class="conte centro">
                <label class="col-12">Cargo Orders  <i class="tam1 bi bi-bell" ></i></label>
            </div>*/}
            <div class="conte derecha"/*"container cont"*/>
              <div class="row">
                  <a class={`col-4 nav-link ${active === 'Upcoming' ? 'active' : ''}`} aria-current="page" href="#" onClick={() => handleSetActive('Upcoming')}>Upcoming</a>
                  <a class={`col-4 nav-link ${active === 'Completed' ? 'active' : ''}`} aria-current="page" href="#" onClick={() => handleSetActive('Completed')}>Completed</a>
                  <a class={`col-4 nav-link ${active === 'Past' ? 'active' : ''}`} aria-current="page" href="#" onClick={() => handleSetActive('Past')}>Past</a>
                 {/*<a class="col-3 nav-link">
                  <div class="col-3 input-group">
                      <span className="input-group-text bg-dark text-white">
                          <i className="bi bi-search"></i>
                      </span>
                      <i className="bi bi-search"></i>
                      <input
                          class="col-3 form-control bg-dark text-white "
                          type="search"
                          placeholder="Busca aquí..." 
                          value={query} 
                          onChange={(e) => setQuery(e.target.value)} 
                        /> 
                  </div>
                </a>*/}
              </div>
               <div class="row">
                <div class="col-2"> </div>
                <div className="col-8">
                  <div className=" input-group">
                  <span className="input-group-text  bg-dark text-white">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    className="form-control input-group-text bg-dark text-white"
                    type="search"
                    placeholder="Busca aquí..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  /></div>
                </div>
              </div>
            </div>

          </div>                
      </div>

        
    );
  }
  
  export default Nav;
  
