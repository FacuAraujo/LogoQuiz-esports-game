import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

// Componentes
import TeamForm from '../components/TeamForm';

class Team extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            formName: '',
        }

        // Definiendo los datos
        this.match = props.match;
        this.currentLevel = this.match.params.levelName;
        this.level = props.levels[this.currentLevel];
        this.team = this.level.find(item => item.id === Number(this.match.params.teamId));      
        this.filterUserTeam = props.user.levels[this.currentLevel].filter(item => item.id === this.team.id);
        this.userTeam = this.filterUserTeam[0];          
    }    

    // Check nombre introducido por el usuario
    handleCheckName() {
        let team = this.team;
        
        let teamName = team.name.toLowerCase();

        if(this.state.formName.toLowerCase() === teamName){
            let userRef = firebase.database().ref('users/' + this.props.userId);
            let teamRef = userRef.child('levels').child(this.currentLevel).child(this.userTeam.id);
            teamRef.update({check: true});         
         }             
         else {
            this.setState({ formName: '', });

            const image = document.getElementById('img-non-checked');
            const input = document.getElementById('formName');
            
            input.classList.add("input-wrong");
            image.classList.add("temblar");
            setInterval(() => {
                image.classList.remove("temblar");
            }, 800);           
        }
    }

    // Evento submit del formulario
    handleSubmit(e) {
        e.preventDefault();
        this.handleCheckName();        
    }

    // Manejo de evento en el input
    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value, });       
    }   

    render() {
        let team = this.team;    
        
        // Renderizar una vista u otra si el nivel esta check o no
        if(!this.userTeam.check){
            return(
                <div className="team-page-container">
                    <img src={team.img} alt={team.id} className="team-img img-fluid" id="img-non-checked" />
                    <TeamForm 
                    onChange={ (e) => this.handleChange(e) } 
                    onSubmit={ (e) => this.handleSubmit(e) } 
                    formName={this.state.formName} 
                    />

                    <Link to={`/levels/${this.currentLevel}`} >
                        <div className="btn-back">
                            <FontAwesomeIcon icon={faChevronLeft} size="3x" className="icon-arrow-back" />
                            <span>Volver</span>
                        </div>
                    </Link>
                </div>
            );
        } else {
            return(
                <div className="team-page-container">                    
                    <img src={team.img_check} alt={team.id} className="team-img img-fluid"/>
                    <div className="team-name">{team.name}</div>

                    <Link to={`/levels/${this.currentLevel}`} >
                        <div className="btn-back">
                            <FontAwesomeIcon icon={faChevronLeft} size="3x" className="icon-arrow-back" />
                            <span>Volver</span>
                        </div>
                    </Link>
                </div>
            );
        }  
    }
}

export default Team;