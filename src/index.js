import React from 'react';
import ReactDOM from 'react-dom';
import FormularioLoteria from './FormularioLoteria';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <FormularioLoteria />
    </BrowserRouter>,
    document.getElementById('root')
);

