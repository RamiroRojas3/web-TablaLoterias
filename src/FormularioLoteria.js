import React, { Component } from 'react';
import TablaLoteria from './TablaLoteria';
import DescargaExcel from './DescargaExcel';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import RecordsPage from './RecordsPage';


class FormularioLoteria extends Component {
  state = {
    numero: '',
    monto: '',
    tipoJugada: '',
    loteriasSeleccionadas: [],
    loterias: {
      Nacional: [],
      Provincia: [],
      Cordoba: [],
      SantaFe: [],
      EntreRios: [],
      Oro: []
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleDelete = (loteria, index) => {
    this.setState(prevState => {
      return {
        loterias: {
          ...prevState.loterias,
          [loteria]: prevState.loterias[loteria].filter((_, i) => i !== index)
        }
      }
    });
  }

  handleLoteriaSelection = (event) => {
    const { value } = event.target;
    if (this.state.loteriasSeleccionadas.includes(value)) {
      event.target.classList.remove("selected");
      this.setState(prevState => {
        return {
          loteriasSeleccionadas: prevState.loteriasSeleccionadas.filter(loteria => loteria !== value)
        };
      });
    } else {
      event.target.classList.add("selected");
      this.setState(prevState => {
        return { loteriasSeleccionadas: [...prevState.loteriasSeleccionadas, value] };
      });
    }
  };
  

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.numero) {
      <div class="alert alert-danger" role="alert">
        Por favor escoga un numero! 
      </div>
      //alert('Por favor escoga el numero');
      return;
    }
    if (!this.state.monto) {
      <div class="alert alert-danger" role="alert">
        Por favor escoga un monto!
      </div>
      //alert('Por favor escoga un monto');
      return;
    }
    if (!this.state.tipoJugada || this.state.tipoJugada === "Escoga el tipo") {
      <div class="alert alert-danger" role="alert">
        Por favor escoga el tipo de jugada!
      </div>
      //alert('Por favor escoga el tipo de jugada');
      return;
    }
    this.state.loteriasSeleccionadas.forEach(loteria => {
      this.setState(prevState => {
        return {
          loterias: {
            ...prevState.loterias,
            [loteria]: [
              ...prevState.loterias[loteria],
              { numero: this.state.numero, monto: "$"+this.state.monto, tipoJugada: this.state.tipoJugada }
            ]
          },
            
            loteriasSeleccionadas: []
        }
      });
    });
  }

  handleSave = () => {
    localStorage.setItem('loterias', JSON.stringify(this.state.loterias));
    alert('Data saved to local storage');
  }

  getTotalMonto = () => {
    let totalMonto = 0;
    Object.values(this.state.loterias).forEach(loteria => {
      loteria.forEach(jugada => {
        totalMonto += Number(jugada.monto.slice(1));
      });
    });
    
    alert(`Total monto: ${totalMonto}`);
  }
  App() {
    return (
      <div>
        <Route exact path="/" component={FormularioLoteria} />
        <Route path="/records" component={RecordsPage} />
      </div>
    )
  }      
  render() {
    return (
      <form className='container-sm' onSubmit={this.handleSubmit}>
        <div className='input-group flex-column'>
        <div className="p-2 input-group mb-3">
            <span className="input-group-text">Tipo de Jugada</span>
            <select className="form-select" aria-label="Default select example" name="tipoJugada" value={this.state.tipoJugada} onChange={this.handleChange}>
              <option selected>Escoga el tipo</option>
              <option value="A la cabeza">A la cabeza</option>
              <option value="A los 5">A los 5</option>
              <option value="A los 10">A los 10</option>
              <option value="A los 20">A los 20</option>
              <option value="Redoblona">Redoblona</option>
            </select>
          </div>

          <div className="p-2 input-group mb-3">
              <span className="input-group-text">Numero</span>
              <input className="form-control" type="number" name="numero" value={this.state.numero} min="0" max="9999" onChange={this.handleChange} />
          </div>
          
          <div className="p-2 input-group mb-3">
            <span className="input-group-text">Monto $</span>
            <input  className="form-control" type="number" name="monto" value={this.state.monto} min="1" onChange={this.handleChange} />
          </div>
          
          
        </div>
        
        <div className="text-center container-sm">
          <div className="row-xs-2 row">
            <div className ="p-2 col">
              <button value="Nacional" onClick={this.handleLoteriaSelection} className={`btn btn-lg  btn-info ${this.state.loteriasSeleccionadas.includes("Nacional") ? "selected" : ""}`}>Nacional</button>
            </div>
            <div className ="p-2 col">
              <button value="Provincia" onClick={this.handleLoteriaSelection} className={`btn btn-lg btn-success ${this.state.loteriasSeleccionadas.includes("Provincia") ? "selected" : ""}`}>Provincia</button>
            </div>
            <div className ="p-2 col">
              <button value="Cordoba" onClick={this.handleLoteriaSelection} className={`btn btn-lg btn-light ${this.state.loteriasSeleccionadas.includes("Córdoba") ? "selected" : ""}`}>Córdoba</button>
            </div>
          </div>
          <div className="row-xs-2 row"> 
            <div className ="p-2 col">              
              <button value="SantaFe" onClick={this.handleLoteriaSelection} className={`btn btn-lg btn-danger ${this.state.loteriasSeleccionadas.includes("SantaFe") ? "selected" : ""}`}>Santa Fe</button>
            </div>
            <div className ="p-2 col">              
              <button value="EntreRios" onClick={this.handleLoteriaSelection} className={`btn btn-lg btn-primary ${this.state.loteriasSeleccionadas.includes("EntreRios") ? "selected" : ""}`}>Entre Ríos</button>
            </div>
            <div className ="p-2 col">              
              <button value="Oro" onClick={this.handleLoteriaSelection} className={`btn btn-lg btn-warning ${this.state.loteriasSeleccionadas.includes("Oro") ? "selected" : ""}`}>Oro</button>
            </div>
          </div>
        </div>

        <br />
       
        <TablaLoteria 
          loterias={this.state.loterias}
          handleDelete={this.handleDelete}
        />
        <div>
          <button type="button" className="btn btn-primary" style={{margin:"10px"}} onClick={this.getTotalMonto}>Calcular Total</button>
          <button type="button" className="btn btn-primary" style={{margin:"10px"}} onClick={this.handleSave}>Guardar</button>
          <DescargaExcel loterias={this.state.loterias} />
        </div>
        <Link to="/records">Ver Historial</Link>

      </form>
    );
  }
}
export default FormularioLoteria;