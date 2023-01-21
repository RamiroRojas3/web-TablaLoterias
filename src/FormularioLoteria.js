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
      <form onSubmit={this.handleSubmit}>
        <div class="input-group">
          <div class="grid">
            <label>
              Número:
              <input type="number" name="numero" value={this.state.numero} min="0" max="9999" onChange={this.handleChange} />
            </label>
          </div>
          <div class="grid">
            <label>
              Monto:
              $<input type="number" name="monto" value={this.state.monto} min="0" onChange={this.handleChange} />
            </label>
          </div>
          
        </div>
        
        <div className="grid text-center">
          
          <div className ="g-col-6 g-col-md-4">
            <button value="Nacional" onClick={this.handleLoteriaSelection} className={`btn btn-info ${this.state.loteriasSeleccionadas.includes("Nacional") ? "selected" : ""}`}>Nacional</button>

            <button value="Provincia" onClick={this.handleLoteriaSelection} className={`btn btn-success ${this.state.loteriasSeleccionadas.includes("Provincia") ? "selected" : ""}`}>Provincia</button>
 
            <button value="Cordoba" onClick={this.handleLoteriaSelection} className={`btn btn-light ${this.state.loteriasSeleccionadas.includes("Córdoba") ? "selected" : ""}`}>Córdoba</button>
          
          </div>
          <div className ="g-col-6 g-col-md-4">
            <button value="SantaFe" onClick={this.handleLoteriaSelection} className={`btn btn-danger ${this.state.loteriasSeleccionadas.includes("SantaFe") ? "selected" : ""}`}>Santa Fe</button>
            <button value="EntreRios" onClick={this.handleLoteriaSelection} className={`btn btn-primary ${this.state.loteriasSeleccionadas.includes("EntreRios") ? "selected" : ""}`}>Entre Ríos</button>
            <button value="Oro" onClick={this.handleLoteriaSelection} className={`btn btn-warning ${this.state.loteriasSeleccionadas.includes("Oro") ? "selected" : ""}`}>Oro</button>
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