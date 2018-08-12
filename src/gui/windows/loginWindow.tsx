import * as React from "react";
import {connect} from "react-redux";
import {logIn, logOut} from "../../gameState/actions";

interface StateProps {
    user: string
}

interface DispatchProps {
    onLoginClick(username: string),
    onLogoutClick()
}

type HomeProps = StateProps & DispatchProps;

function mapStateToProps(state) {
    return {
        user: state.user
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
        if(this.props.user == undefined){
            this.props.onLoginClick(this.state.username);
        } else {
            this.props.onLogoutClick();
        }

        //Reset component local state
        this.setState({username: "", password: ""})
    };

    render() {
        const loggedIn = this.props.user != undefined;

        return (
            <div id={'loginWindow'}>
                <h1>Hello{loggedIn?', '+this.props.user:', stranger'}!</h1>
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