import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class TeamForm extends Component {
    handleOnFocus(e) {
        e.target.placeholder = "";
    }

    handleOnBlur(e) {
        e.target.placeholder = "Ingresa el nombre";
    }

    render() {
        return(
            <div className="team-form">
                <form onSubmit={ (e) => this.props.onSubmit(e) }>
                    <div className="form-input">
                        <input 
                        className="form-control name-input" 
                        type="text" 
                        value={this.props.formName} 
                        name="formName"
                        id="formName"
                        onChange={ (e) => this.props.onChange(e) } 
                        placeholder="Ingresa el nombre" 
                        autoComplete="off"
                        onFocus={(e) => this.handleOnFocus(e)}
                        onBlur={(e) => this.handleOnBlur(e)}
                        />
                    </div>
                    <button type="submit" className="btn-submit"><FontAwesomeIcon icon={faCheck} className="i-check" /></button>
                </form>
            </div>
        );
    }
}

export default TeamForm;