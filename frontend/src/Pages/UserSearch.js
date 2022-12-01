import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

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

function TableBody(props) {
  const rows = props.userData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.username}</td>
        <td>
          <button onClick={() => props.correctNav(row)}>View Profile</button>
        </td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
}

function UserSearch(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies("password");
  if (!cookies.password) {
    navigate("/");
  }

  const [staticUsers, setStaticUsers] = useState([]); // save state for deleting characters from search box
  const [filteredUsers, setFilteredUsers] = useState([...staticUsers]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (location.state) {
      console.log("Hi");
      console.log(location.state);
      props.getAllUsers(location.state.id).then((result) => {
        if (result) {
          setStaticUsers(
            result.sort((a, b) => a.username.localeCompare(b.username))
          );
          setFilteredUsers(
            result.sort((a, b) => a.username.localeCompare(b.username))
          );
        }
      });
    } else {
      console.log("Uh oh");
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
    }
  }, []);

  function correctNav(row) {
    if (row.username === cookies.username) {
      navigate("/profile");
    } else {
      navigate("/user/" + row.username, {
        state: {
          _id: row._id,
          // id: row.id,
          username: row.username,
          name: row.name,
          favmovies: row.favmovies,
          friends: row.friends,
        },
      });
    }
  }

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
    <div class="bg_image1">
      <div>
        <nav>
          <NavBar handleSubmit={props.handleSubmit}></NavBar>
        </nav>
        <div class="user-search-bar">
          <input
            style={{ color: "white" }}
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
          <TableBody userData={filteredUsers} correctNav={correctNav} />
        </table>
      </div>
    </div>
  );
}

export default UserSearch;
