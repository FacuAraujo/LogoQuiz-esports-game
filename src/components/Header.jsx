import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import logo from '../assets/LogoQuiz_logo.svg';

class Header extends Component {   
   
   handleClick() {
      const logoutBox = document.getElementById("box-logout");
      
      if(logoutBox.style.display === "none"){
         logoutBox.style.display = "flex";
      } else {
         logoutBox.style.display = "none";
      }  
   }   

   render() {

      return(
         <header id="header">
             <div className="header-content">
                <div className="header-logo">
                      <img src={logo} alt="LogoQuiz" />
                </div>
 
                <div className="user">
                   <div className="user-name">{ this.props.user.displayName }</div>
                   <button className="user-circle" onClick={ () => this.handleClick() }>
                      <div className="user-avatar">                        
                         <img src={this.props.user.photoURL} alt={this.props.user.displayName} className="img-fluid" />
                      </div>
                   </button>
 
                   <div id="box-logout" style={{display: "none"}}>
                      <button onClick={ () => {this.props.handleLogout()} }><FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" /> Cerrar sesión</button>
                   </div>
                </div>
             </div>
         </header> 
    );
   }
       
}
export default Header;