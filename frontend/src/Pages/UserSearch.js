import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
      </tr>
    </thead>
  );
}

function doSomething() {
  console.log("hi");
}

function TableBody(props) {
  const navigate = useNavigate();
  const rows = props.userData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.username}</td>
        <td>
          <button
            onClick={() =>
              navigate("/user/" + row.username, {
                state: {
                  id: row.id,
                  username: row.username,
                  name: row.name,
                  favmovies: row.favmovies,
                },
              })
            }
          >
            View Profile
          </button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function UserSearch(props) {
  const navigate = useNavigate();
  if (!props.cookies.password) {
    navigate("/");
  }

  const [staticUsers, setStaticUsers] = useState([]); // save state for deleting characters from search box
  const [filteredUsers, setFilteredUsers] = useState([...staticUsers]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    props.getAllUsers().then((result) => {
      if (result) {
        setStaticUsers(
          result.sort((a, b) => a.username.localeCompare(b.username))
        );
        setFilteredUsers(
          result.sort((a, b) => a.username.localeCompare(b.username))
        );
      }
    });
  }, []);

  function handleChange(event) {
    setSearchInput(event.target.value);
    const updated = staticUsers.filter((user) => {
      return (
        user.name.includes(event.target.value) ||
        user.username.includes(event.target.value)
      );
    });
    setFilteredUsers(updated);
  }

  return (
    <div>
      <div>
        <nav>
          <NavBar handleSubmit={props.handleSubmit}></NavBar>
        </nav>
        <div class="user-search-bar">
          <input
            type="text"
            placeholder="Search for users..."
            onChange={handleChange}
            value={searchInput}
          />
        </div>
      </div>
      <div>
        <table>
          <TableHeader />
          <TableBody userData={filteredUsers} />
        </table>
      </div>
    </div>
  );
}

export default UserSearch;
