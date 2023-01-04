import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import resetpasswordbutton from '../images/resetpasswordbutton.png';
import betagoapplicationname from '../images/betagoapplicationname.png';
import Card from '@mui/joy/Card';
import { Footer } from '../Footer';
import { Header } from '../Header';



class LoginResetPassword extends React.Component {
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

                    <div className="col-md-6 col-md-offset-3" style={{ backgroundColor: "whilte" }}>
                        <br></br>
                        <table><tr><td></td><td></td> <td><img src={betagoapplicationname} alt="React Logo" style={{ width: 200, height: 30 }} /></td></tr>
                            <tr><td></td><td><h2><center>Reset Password </center></h2></td><td></td></tr>
                            <tr><td></td><td><h5><center>Enter a new password for your account.</center></h5></td><td></td></tr>

                            
                            <tr><td></td><td> <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                    <label htmlFor="username">New Password</label>
                                    <input type="text" className="form-control" placeholder="Enter new password " name="username" value={username} onChange={this.handleChange} />
                                    {submitted && !username &&
                                        <div className="help-block">Username is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <label htmlFor="password">Confirm New Password</label>
                                    <input type="password" className="form-control" placeholder="Enter new password " name="password" value={password} onChange={this.handleChange} />
                                    {submitted && !password &&
                                        <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <br></br>
                                <br></br>
                                <div className="form-group">
                                    <center>  <img src={resetpasswordbutton} alt="React Logo" style={{ width: 300, height: 40 }} /></center>
                                    <h5><center> <u><a href="#" style={{ fontSize: '15px', color: 'green', FontFace: 'underline' }}>Return to Login.</a></u></center></h5>
                                </div>
                            </form></td><td></td></tr>
                        </table>

                    </div></Card><Footer/></center>
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

const connectedLoginResetPassword = connect(mapState, actionCreators)(LoginResetPassword);
export { connectedLoginResetPassword as LoginResetPassword };