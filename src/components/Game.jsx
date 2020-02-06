import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';

// Import niveles generales
import levels from '../config/levels';

// Componentes
import Team from '../pages/Team';

// Paginas
import Home from '../pages/Home';
import ListTeams from './ListTeams';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            levels: '',
        }
    }

    componentDidMount() {
        const user = this.props.user;
        // Check si existe el usuario o no
        // Guardarlo si no existe y luego almacenarlo en el estado
        firebase.database().ref('users/' + user.uid).on('value', snapshot => {
            if(!snapshot.val()){ 
                this.writeUserData(user.uid, user.displayName, user.email, user.photoURL);

            } else {
            // Si existe almacenarlo en el estado                   
               this.setState({
                    user: snapshot.val(),
               });         
            }
        }); 
        
        // Pedir niveles generales
        const dataRef = firebase.database().ref('/levels')
        dataRef.once('value')
            .then(snapshot => { this.setState({levels: snapshot.val()}) });
    }
    
    // Funcion para guardar usuario en la base de datos en caso de no existir
    writeUserData(userId, name, email, imageUrl) {
        const newUser = {
            username: name,
            email: email,
            profile_picture: imageUrl,
            levels: levels,
        }

        // Guardando usuario en la base de datos y luego almacenandolo en el estado
        firebase.database().ref('users/' + userId).set(newUser);
        this.setState({ user: newUser, });
    }
    
    render() {        
        if(this.state.levels && this.state.user){
            return(
                <Router>
                    <Route exact path="/" component={() => {
                        return <Home 
                                    userLevels={this.state.user.levels} 
                                    levels={this.state.levels} 
                                />
                    }} />

                    <Route exact path="/levels/:levelName" component={(props) => {
                        return <ListTeams 
                                    {...props} 
                                    userLevels={this.state.user.levels} 
                                    levels={this.state.levels} 
                                />
                    }} />

                    <Route exact path="/levels/:levelName/team/:teamId" component={(props) => {
                        return <Team 
                                    {...props} 
                                    user={this.state.user} 
                                    userId={this.props.user.uid} 
                                    levels={this.state.levels}
                                 />
                    }} />                                       
                </Router>
            );
        }

        return(
            <div className="loading-page">
                <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div> 
        );     
    }

}

export default Game;