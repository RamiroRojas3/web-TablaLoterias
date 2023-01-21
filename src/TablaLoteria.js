import React, { Component } from 'react';

class TablaLoteria extends Component {
  handleDelete = (index) => {
      this.props.handleDelete(index);
  }

  handleDownload = (index) => {
    this.props.handleDownload(index);
  }

  render() {
    return (
      <table className='text-bg-light table container-sm'id="loterias"> 
        <thead>
          <tr>
            <th scope="col">Lotería</th>
            <th scope="col">Número</th>
            <th scope="col">Monto</th>
            
          </tr>
        </thead>
        <tbody style={{maxHeight : "200px", overflow: "auto"}}>
          {Object.keys(this.props.loterias).map(loteria => (
          this.props.loterias[loteria].map((item, index) => (
            
          <tr key={index}>
            
            <td>{loteria}</td>
            <td>{item.numero}</td>
            <td>{item.monto}</td>
            <td>
              <button className="btn btn-outline-danger" onClick={() => this.props.handleDelete(loteria, index)}>Eliminar</button>
            </td>
          </tr>
          ))
          ))}
        </tbody>
      </table>
    );
  }
}
      
export default TablaLoteria;