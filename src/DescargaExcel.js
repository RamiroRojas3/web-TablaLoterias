import React, { Component } from 'react';
import * as XLSX from 'xlsx';

class DescargaExcel extends Component {

     descarga(){

        /* Create worksheet from HTML DOM TABLE */
        const table = document.getElementById("loterias");
        const wb = XLSX.utils.table_to_book(table);

        /* Export to file (start a download) */
        XLSX.writeFile(wb, "loteria.xlsx");
    };

 
    render() {
        return (
            <button onClick={this.descarga}>Descargar</button>
        );
    }
}

export default DescargaExcel;