import * as React from "react";
import {connect} from "react-redux";
import {logIn, logOut} from "../../gameState/actions";

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: username => {
            dispatch(logIn(username))
        },
        onLogoutClick: () => {
            dispatch(logOut())
        }
    }
};

class LoginWindow extends React.Component {
    render() {
        return (
            <div id={'loginWindow'}>
                <h1>Hello{this.props.user == undefined?'':', '+this.props.user}!</h1>
                <h1>Welcome to the test page!</h1>
                <button onClick={this.props.user == undefined?this.props.onLoginClick('Peter'):this.props.onLogoutClick()}>
                    {this.props.user == undefined?'Login':'Logout'}
                </button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginWindow);