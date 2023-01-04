import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import sendotpbutton from '../images/sendotpbutton.png';
import sendemaillinkbutton from '../images/sendemaillinkbutton.png'
import betagoapplicationname from '../images/betagoapplicationname.png';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './style.css';
import Card from '@mui/joy/Card';
import { Footer } from '../Footer';
import { Header } from '../Header';


class LoginFirstTime extends React.Component {
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
                <Card variant="outlined" sx={{ width: 720, backgroundColor: "white" }}>

                    <div className="col-md-6 col-md-offset-3" style={{ backgroundColor: "whilte" }}>
                        <br></br>
                        <table><tr><td></td><td></td> <td><img src={betagoapplicationname} alt="React Logo" style={{ width: 200, height: 30 }} /></td></tr>

                            <br></br> <tr><td></td><td><h2><center>First Time Login </center></h2></td><td></td></tr>
                            <tr><td></td><td><h5><center>Choose your prefered login method.</center></h5></td><td></td></tr>

                            <tr><td></td><td>
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                                        <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="phone"
                                            name="radio-buttons-group">
                                            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                                <FormControlLabel value="phone" control={<Radio />} label="Phone number" onclick="showphone();" /><label htmlFor="username"></label>
                                                <div id="divphone" ><input type="text" className="form-control" placeholder="000-000-0000 " name="username" value={username} onChange={this.handleChange} />
                                                    {submitted && !username &&
                                                        <div className="help-block">Username is required</div>
                                                    }
                                                    <br></br>
                                                    <center>  <img src={sendotpbutton} alt="React Logo" style={{ width: 300, height: 40 }} /></center>
                                                </div></div>
                                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                                <FormControlLabel value="email" control={<Radio />} label="E-mail" onclick="showemail();" /><label htmlFor="password"></label>
                                                <div id="divemail" ><input type="password" className="form-control" placeholder="example@gmail.com " name="password" value={password} onChange={this.handleChange} />
                                                    {submitted && !password &&
                                                        <div className="help-block">Password is required</div>
                                                    }
                                                    <br></br>
                                                    <center>  <img src={sendemaillinkbutton} alt="React Logo" style={{ width: 300, height: 40 }} /></center>
                                                </div></div>
                                            <br></br>
                                            <div className="form-group">
                                                <br></br>
                                                <h5><center><u><a href="#" style={{ fontSize: '15px', color: 'green', FontFace: 'underline' }}>Return to Login.</a></u></center></h5>
                                            </div>
                                        </RadioGroup>
                                    </FormControl></form></td><td></td></tr>
                        </table>

                    </div></Card><Footer /></center>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

function showphone() {
    document.getElementById('divphone').style.display = 'block';
    document.getElementById('divemail').style.display = 'none';
}
function showemail() {
    document.getElementById('divphone').style.display = 'none';
    document.getElementById('divemail').style.display = 'block';
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginFirstTime = connect(mapState, actionCreators)(LoginFirstTime);
export { connectedLoginFirstTime as LoginFirstTime };