import React, { Component } from 'react';

import { Link } from 'react-router-dom';

// Componentes
import TeamCard from './TeamCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class ListTeams extends Component {
    constructor(props){
        super(props);

        this.currentLevel = props.match.params.levelName;
    }
    
    filterCheck(teamId) {
        let teamFilter = this.props.userLevels[this.currentLevel];
        let team = teamFilter[teamId];
        return team.check;
    } 
    
    render() {         
        const level = this.props.levels[this.currentLevel];
            return (
                <div className="container">
                    <div className="level-head">
                        <div className="level-title">Level {this.currentLevel.split('level')}</div>
                        
                        <Link to={`/`} >
                            <div className="btn-back">
                                <FontAwesomeIcon icon={faChevronLeft} size="3x" className="icon-arrow-back" />
                                <span>Volver</span>
                            </div>
                        </Link>
                    </div>

                    <div className="teams-grid">                    
                        {level.map(team => {
                            return <TeamCard key={team.id} 
                                            team={team}
                                            currentLevel={this.currentLevel}
                                            check={this.filterCheck(team.id)}
                                    />
                        }
                        )}
                    </div>
                </div>                
            );        
    }
    
}

export default ListTeams;