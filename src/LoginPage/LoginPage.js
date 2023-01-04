import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import Card from '@mui/joy/Card';
import { Footer } from '../Footer';
import { Header } from '../Header';
import loginpagepic from '../images/loginpagepic.png';
import loginbutton from '../images/loginbutton.png';
import betagoapplicationname from '../images/betagoapplicationname.png';
import Checkbox from '@mui/material/Checkbox';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
       
        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            isChecked: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleChange = () => {
        this.setState({
          isChecked: !this.state.isChecked,
        });
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
                <Card variant="outlined" sx={{ width: 620, backgroundColor: "white" }}>
                    <div className="col-md-12">

                        <form name="form" onSubmit={this.handleSubmit}>
                            <center><table ><tr><td><img src={loginpagepic} style={{ width: 250, height: 250 }} /></td><td>
                                <table width="100%" >
                                    <tr><td> &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; <img src={betagoapplicationname} alt="React Logo" style={{ width: 150, height: 25 }} /></td></tr>
                                    <tr><td><h2>Log in</h2></td></tr>
                                    <tr><td>
                                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                            <label htmlFor="username" style={{ alignItems: 'left', }}>Phone number</label>
                                            <input type="text" className="form-control" placeholder="000-000-0000" name="username" value={username} onChange={this.handleChange} />
                                            {submitted && !username &&
                                                <div className="help-block">Username is required</div>
                                            }
                                        </div></td></tr><tr><td>
                                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                                <label htmlFor="password" style={{ alignItems: 'left', }}>Password</label>
                                                <input type="password" className="form-control" placeholder="Enter password" name="password" value={password} onChange={this.handleChange} />
                                                {submitted && !password &&
                                                    <div className="help-block">Password is required</div>
                                                }

                                            </div></td></tr><tr>
                                        <td><input type="checkbox" id="keepmeloggedin" name="keepmeloggedin" value="keepmeloggedin" 
                                         defaultChecked={this.state.isChecked}
                                         onChange={this.toggleChange} />&nbsp;&nbsp;&nbsp;&nbsp;Keep me logged in &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Link to="/register" className="btn btn-link" style={{ color: 'green' }}><u>Forgot password ? </u></Link></td></tr>
                                    <tr><td>
                                        <div className="form-group">
                                            <center>  <img src={loginbutton} alt="React Logo" style={{ width: 300, height: 40 }} /></center>
                                            {loggingIn &&
                                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            }
                                            <center><Link to="/register" className="btn btn-link" style={{ color: 'green' }}><u>First Time Login.</u></Link></center>
                                        </div></td></tr></table></td></tr></table></center>

                        </form>
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

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };