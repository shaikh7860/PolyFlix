import React from "react";

function Profile(props) {

  return <div>THIS IS THE PROFILE PAGE
    <div>
      Name: {props.token['name']}
    </div>
    <div>
      Username: {props.token['username']}
    </div>
    <div>
      <input type="button" value="Log Out" onClick={props.logOut} />
    </div>
  </div>
}

export default Profile;