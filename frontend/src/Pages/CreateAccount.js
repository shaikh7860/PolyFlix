import React, {useState} from 'react';

function CreateAccount(props) {
    const [token, setToken] =  useState({
        name: '',
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
            <input type="button" value="Create Account" onClick={submitForm} />
        </div>
      </form>
    )
}

export default CreateAccount