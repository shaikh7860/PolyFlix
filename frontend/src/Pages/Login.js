import React, {useState} from 'react';

function Login(props) {
    const [token, setToken] =  useState({
        username: '',
        password: '',
    });
    
    function submitForm() {
        props.handleSubmit(token);
        setToken({username: '', password: ''});
    }
    
    return(
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
            <input type="button" value="Log in" onClick={submitForm} />
        </div>
      </form>
    )
}

export default Login