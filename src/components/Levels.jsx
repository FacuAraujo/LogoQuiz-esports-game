import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Levels extends Component {
    constructor(props) {
        super(props);

        this.keys = Object.keys(this.props.levels);
    } 
    
    render() {
        return(
            <div className="container">
                <div className="levels-list">
                    <ul>
                        {this.keys.map( level => {
                            return <Link key={level} to={`/levels/${level}`}>                                
                                        <li className="level-item">Level {level.split('level')}</li>
                                    </Link>
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Levels;
