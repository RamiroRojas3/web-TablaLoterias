import React from 'react';
import ReactDOM from 'react-dom';
import FormularioLoteria from './FormularioLoteria';
import { BrowserRouter } from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
        <FormularioLoteria />
    </BrowserRouter>,
    document.getElementById('root')
);

