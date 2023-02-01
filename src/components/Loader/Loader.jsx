import React from 'react';

import './Loader.scss'

import loader from "../../assets/img/loader.svg"

const Loader = () => {  
    return (
        <div className='loaderBlock'>
            <img width={100} height={100} src={loader} alt="Loader" />
        </div>        
    );
  };
  
export default Loader;