import React, { Component } from 'react';
import firebase from 'firebase';

// Import componentes
import Game from './components/Game';
import Header from './components/Header';

// Import assets
import logo from './assets/LogoQuiz_logo.svg';
import GoogleLogin from './assets/btn_google_signin_light_normal_web@2x.png';

// Import estilos
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });    
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`El usuario ${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout() {
    firebase.auth().signOut()
      .then(result => console.log(`El usuario ${result.user.email} ha cerrado la sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));      
  }

  renderLoginButton() {
    if(!this.state.user){
      return (
        <section id="login">
          <img src={logo} alt="LogoQuiz" className="img-fluid logo" />
          <button  onClick={ () => {this.handleAuth()} } className="btn-login">
            <img src={GoogleLogin} alt="Google Login" className="img-fluid" />
          </button>          
        </section>
      );
    } else {
      return(
        <div className="app-menu">
          <Header user={this.state.user} handleLogout={ () => {this.handleLogout()} } />       
          <Game user={this.state.user} />
        </div>
      );
    }
  }
  
  render() {
    return (
      <>      
        {this.renderLoginButton()}
      </>      
    );
  }  
}

export default App;
