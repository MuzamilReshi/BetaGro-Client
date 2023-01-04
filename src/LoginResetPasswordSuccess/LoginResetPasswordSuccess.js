import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import passwordchangedcheck from '../images/passwordchangedcheck.png';
import donebutton from '../images/donebutton.png';
import Card from '@mui/joy/Card';
import { Footer } from '../Footer';
import { Header } from '../Header';


class LoginResetPasswordSuccess extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <center><Header />
                <Card variant="outlined" sx={{ width: 520, backgroundColor: "white" }}>
                    <center><div className="col-md-6 col-md-offset-3" >
                        <br></br>
                        <center><img src={passwordchangedcheck} alt="React Logo" style={{ width: 100, height: 80 }} /></center>
                        <br></br>
                        <h2><center>Password Changed </center></h2>
                        <h5><center>You have successfully updated your password.</center></h5>
                        <br></br>
                        <center><img src={donebutton} alt="React Logo" style={{ width: 250, height: 40 }} /></center>
                    </div> </center>
                </Card><Footer /></center >
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginResetPasswordSuccess = connect(mapState, actionCreators)(LoginResetPasswordSuccess);
export { connectedLoginResetPasswordSuccess as LoginResetPasswordSuccess };