import React from 'react';
import {useNavigate} from 'react-router-dom';

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
    );
  }

  function TableBody(props) {
    const navigate = useNavigate();

    console.log(props.characterData)
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
              <td>{row._id}</td>
              <td>{row.name}</td>
              <td>{row.job}</td>
              <td>
                <button onClick={() => props.removeCharacter(index)}>Delete</button>
              </td>
              <td>
                <button onClick={() => navigate("/movie/" + row.name) }>View Info</button>
              </td>
            </tr>
          );
        });
        return (
            <tbody>
               {rows}
            </tbody>
         );
      }  

      function Table(props) {
        return (
          <table>
            <TableHeader />
            <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
          </table>
        );
      }

export default Table;