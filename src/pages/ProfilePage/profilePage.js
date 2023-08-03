import React, { Component, useCallback } from 'react';
import {getCurrentUser, signOut} from "./Cognito"


const ProfilePage = () => {
class UserStatus extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      phone: null
     


    };
  }
  componentDidMount(){
    getCurrentUser(attributes =>{
      for(let i=0; i< attributes.length;i++){
        if(attributes[i].Name ==="firstName"){
          this.setState({firstName: attributes[i].Value});
        }
        if(attributes[i].Name ==="lastName"){
          this.setState({lastNameName: attributes[i].Value});
        }
        if(attributes[i].Name ==="email"){
          this.setState({email: attributes[i].Value});
        }
        if(attributes[i].Name ==="phone"){
          this.setState({phone: attributes[i].Value});
        }
       
      }
    })
  }




//was export
//was const before bracket change
  getCurrentUser = useCallback =>{
  const cognitoUser = userPool.getCurrentUser();
  if(!cognitoUser) return false;
  cognitoUser.getSession((err, session)=>{
    if(err){
      console.log(err);
      return;
    }
    cognitoUser.getUserAttributes((err, attributes) =>{
      if(err) return;
      callback(attributes);
    });
  });
};
  
}
  return (
    <>
    <div>
      <h1>Profile</h1>
      <span>this.state.email</span>
      <br></br>
      <span>this.state.firstName</span>
      <br></br>
      <span>this.state.lastName</span>
      <br></br>
      <span>this.state.city</span>
      <br></br>




    </div>
    </>
  );
}


export default ProfilePage;
