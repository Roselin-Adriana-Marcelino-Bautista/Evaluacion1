import React from 'react';
import './Nav.css';
import './Titulo.css';


function Titulo() {
    return (
        <div className='tel'>
            {/* Primera Parte */}
            <div className='navbar editNav bg-dark navbar-expand-lg bg-body-tertiary'>
                <div class="tel container-fluid">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li class="tam nav-item ">
                                <a class="nav-link active" aria-current="page" href="#">Cargo Orders</a>
                            </li>
                            <li className="nav-item ms-auto">
                                <a className="nav-link active" aria-current="page" href="#">
                                    <i className="bi bi-bell"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Titulo;

