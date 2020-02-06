import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TeamCard extends Component {
        
    render() {
        if(!this.props.check) {
            return (
                <Link to={`/levels/${this.props.currentLevel}/team/${this.props.team.id}`} >
                    <div className="card card-team">
                        <img src={this.props.team.img} alt="team" className="img-fluid"/>
                    </div>
                </Link>
            );
        } else {
            return (                
                <div className="card card-team card-checked">
                    <img src={this.props.team.img_check} alt="team" className="img-fluid"/>
                </div>                
            );
        }
    }   
        
}

export default TeamCard;