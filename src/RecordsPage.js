import React, { useState, useEffect } from 'react';

function RecordsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loterias = JSON.parse(localStorage.getItem('loterias'));
    setData(loterias);
  }, []);

  return (
    <div>
      <h2>Records</h2>
        <table>
            <thead>
            <tr>
                <th>Numero</th>
                <th>Monto</th>
                <th>Tipo de Jugada</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(data).map(loteria => 
                loteria.map((jugada, index) => (
                <tr key={index}>
                    <td>{jugada.numero}</td>
                    <td>{jugada.monto}</td>
                    <td>{jugada.tipoJugada}</td>
                </tr>
                ))
            )
            } 
            </tbody>
        </table>
    </div>
  );
}
export default RecordsPage;
