import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Footer } from '../Footer';
import { userActions } from '../_actions';
import email from '../images/email.png';
import Card from '@mui/joy/Card';
import { Header } from '../Header';


class LoginCheckEmailFirst extends React.Component {
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
            <center><Header/>
                <Card variant="outlined" sx={{ width: 720, backgroundColor: "white" }}>
           
            <div className="col-md-6 col-md-offset-3">
                <br></br>
                <center><img src={email} alt="React Logo" style={{ width: 100, height: 60 }} /></center>
                <br></br>
                
                <h2><center>Check your e-mail</center></h2>
                <h5><center>We have send an e-mail to the address provided.</center></h5>
                <h5><center>Check the link in the e-mail to verify your account.</center></h5>
                <br></br>
               
                <h5><center>Didn't receive the code?  <u><a href ="#" style={{ fontSize: '15px', color: 'green', FontFace:'underline' }}>Resend.</a></u></center></h5>

            </div></Card><Footer /></center>
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

const connectedLoginCheckEmailFirst = connect(mapState, actionCreators)(LoginCheckEmailFirst);
export { connectedLoginCheckEmailFirst as LoginCheckEmailFirst };