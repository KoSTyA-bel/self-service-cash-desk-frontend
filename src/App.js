import HomePage from './pages/HomePage/HomePage';

import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import CheckPage from './pages/CheckPage/CheckPage';
import axios from './axios.js';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
    return ( <
        div className = "App" >
        <
        Routes >
        <
        Route path = "/"
        element = { < HomePage / > }
        /> <
        Route path = "/products"
        element = { < ProductPage / > }
        /> <
        Route path = "/cart"
        element = { < CartPage / > }
        /> <
        Route path = "/check"
        element = { < CheckPage / > }
        /> <
        Route path = "/error"
        element = { < ErrorPage / > }
        /> <
        /Routes> <
        /div>
    );
}

export default App;