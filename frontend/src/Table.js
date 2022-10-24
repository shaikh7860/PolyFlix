import React from 'react';

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Rating</th>
        </tr>
      </thead>
    );
  }

  function TableBody(props) {
    const rows = props.movieData.map((row, index) => {
        return (
            <tr key={index}>
              <td>{row.imdb_id}</td>
              <td>{row.title}</td>
              <td>{row.rating}</td>
              {/* <td>
                <button onClick={() => props.removeMovie(index)}>Delete</button>
              </td> */}
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