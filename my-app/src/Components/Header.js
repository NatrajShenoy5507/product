import React, { useState } from 'react';
import '../styles/Header.css'
import Modal from 'react-modal'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import {Grid} from '@material-ui/core'

const modalstyle={
  content:{
    top:'50%',
    left:'50%',
    right:'50%',
    width:'50%',
    height:'100%',
    marginRight:'-50%',
    transform:'translate(-50%,-50%)'


  }
}
const styles= {
  container: {
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     padding: 10,
     flex: 1,
  },
  form: {
     display: 'flex',
     flexDirection: 'column',
     padding: 10
  },
  input: {
     marginTop: 20,
     marginBottom: 20,
     padding: 1,
  },
  button: {
     marginTop: 10,
     marginBottom: 10,
     padding: 1,
  }
}
   
Modal.setAppElement('#root')
export default function Header() {
  const [isLoginModalOpen,setIsLogInModalOpen]= useState(false)
  const facebookLogin= (response) => {
    console.log(response);
  }
  const googleLogin = (response) => {
    console.log(response);
  }
  return <div>
     <div>
        
        
      <span>
          <span class="Ellipse-2">
              <span class="e">e!</span>
          </span>
      </span>
          <span class="logsign">
                    <a href='#' class="Login" onClick={()=>setIsLogInModalOpen(true)}>Login</a>
                    <a href='#' class="Create-an-account"> Create an account </a>
          </span>
   
      </div>
      <Modal isOpen={isLoginModalOpen } style={modalstyle} >
        <h2>
          Login
          <button onClick={()=>setIsLogInModalOpen(false)} className="btn btn-outline-danger float-end">X</button>
        </h2>
       <div  style={styles.container}>   
       <Grid style={{
            width: '100%'
         }} xs={12} sm={10} md={6}>
            <form style={styles.form}>
          <div>
            <input style={styles.input} placeholder='Email'type="email"/>
            </div>
            <input style={styles.input} placeholder='Password' type="password"/>
            <div>
           
            <div>
              <button className='col-3 col-8' style={ styles.button}>Login</button>
            </div>
          </div>
        <div className="mt-4">
          <FacebookLogin
          textButton='Continue with Facebook'
          appId="1273256156529930"
          autoLoad={true}
          fields="name,email,picture"
          callback={facebookLogin()}
          cssClass="btnFacebook"
          icon="fa-facebook"
          textButton = "&nbsp;&nbsp;Sign In with Facebook"/>

          <GoogleLogin buttonText='Continue with Google'
          clientId=" 541091751590-1k2arqo5f7pa9ues10hh3fd7i3so5tnc.apps.googleusercontent.com "
          buttonText="Login"
          onSuccess={googleLogin()}
          onFailure={(googleLogin())}
          cookiePolicy={'single_host_origin'}
          className="btnGoogle"/>
          

        </div>
        </form>
        </Grid>
        </div>
      </Modal>
  </div>;
}
