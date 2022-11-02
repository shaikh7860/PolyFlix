import React, {useState} from 'react';

function Login(props) {
    const [token, setToken] =  useState({
        username: '',
        password: '',
    });

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "username")
            setToken(
                {username: value, password: token['password']}
            );
        else
            setToken(
                {username: token['username'], password: value}
            );
    }
    
    function submitForm() {
        props.handleSubmit(token);
        setToken({username: '', password: ''});
    }
    
    return(
      <form>
        <label>
          <p>Username</p>
          <input 
            type="text"
            name="username"
            id="username"
            value={token.username}
            onChange={handleChange}
           />
        </label>
        <label>
          <p>Password</p>
          <input 
            type="password"
            name="password"
            id="password"
            value={token.password}
            onChange={handleChange}
            />
        </label>
        <div>
            <input type="button" value="Log in" onClick={submitForm} />
        </div>
      </form>
    )
}

export default Login