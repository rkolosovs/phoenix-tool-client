/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

import * as React from "react";
import {connect} from "react-redux";
import {logIn, logOut} from "../../gameState/actions";
import {Login, UserGroup} from "../../gameState/gameState";

interface StateProps {
    login: Login
}

interface DispatchProps {
    onLoginClick(username: string),
    onLogoutClick()
}

type HomeProps = StateProps & DispatchProps;

function mapStateToProps(state) {
    return {
        login: state.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLoginClick: username => {
            dispatch(logIn(username))
        },
        onLogoutClick: () => {
            dispatch(logOut())
        }
    }
}

class LoginWindow extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        //Do server communication here!
        // ...

        //Side effect free change of redux state
        if(this.props.login.group === UserGroup.GUEST){
            this.props.onLoginClick(this.state.username);
        } else {
            this.props.onLogoutClick();
        }

        //Reset component local state
        this.setState({username: "", password: ""})
    };

    render() {
        const loggedIn = this.props.login.group === UserGroup.GUEST;

        return (
            <div id={'loginWindow'}>
                <h1>Hello{this.props.login.name}!</h1>
                <h2>{loggedIn?'Welcome to the test page':'Please log in'}!</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Username:</label>
                    <input
                        id="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <br/>
                    <label>Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <br/>
                    <button
                        disabled={!this.validateForm() && !loggedIn}
                        type="submit"
                    >
                        {loggedIn?'Logout':'Login'}
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginWindow);