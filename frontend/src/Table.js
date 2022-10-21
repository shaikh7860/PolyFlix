import React from 'react';

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
    );
  }

  function TableBody(props) {
    const rows = props.movieData.map((row, index) => {
        return (
            <tr key={index}>
              <td>{row._id}</td>
              <td>{row.name}</td>
              <td>{row.description}</td>
              <td>
                <button onClick={() => props.removeMovie(index)}>Delete</button>
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
            <TableBody movieData={props.movieData} removeMovie={props.removeMovie} />
          </table>
        );
      }

export default Table;