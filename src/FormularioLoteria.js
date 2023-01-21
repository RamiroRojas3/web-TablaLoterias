import React, { Component } from 'react';
import TablaLoteria from './TablaLoteria';
import DescargaExcel from './DescargaExcel';

class FormularioLoteria extends Component {
  state = {
    numero: '',
    monto: '',
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
    this.state.loteriasSeleccionadas.forEach(loteria => {
      this.setState(prevState => {
        return {
          loterias: {
            ...prevState.loterias,
            [loteria]: [
              ...prevState.loterias[loteria],
              { numero: this.state.numero, monto: this.state.monto }
            ]
          },
            
            loteriasSeleccionadas: []
        }
      });
    });
  }
          
  render() {
    return (
      <form className='container-sm' onSubmit={this.handleSubmit}>
        <div className='input-group flex-column'>

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
          <div className="ow-xs-2 row"> 
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
          handleDownload={this.handleDownload}
        />

        <DescargaExcel loterias={this.state.loterias} />

      </form>
    );
  }
}
export default FormularioLoteria;