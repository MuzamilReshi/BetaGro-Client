import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import contacticon from '../images/contacticon.png';
import messageemailicon from '../images/messageemailicon.png';
import facebookicon from '../images/facebookicon.png';
import instagramicon from '../images/instagramicon.png';
import betgroonlineicon from '../images/betgroonlineicon.png';
import betgrofoodicon from '../images/betgrofoodicon.png';
import footerapplicationname from '../images/footerapplicationname.png';
import Container from '@material-ui/core/Container';
import Card from '@mui/joy/Card';
import { Autocomplete } from '@mui/material';

class Footer extends React.Component {

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
    render() {
        const { user, users } = this.props;

        return (

            <center><br></br>
                <Card variant="outlined" sx={{ width: 1010, backgroundColor: "white" }}>
                    <><><table ><tr><td><img src={footerapplicationname} alt="React " style={{ width: 100, height: 40 }} /></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><table width="90%">
                        <tr><td  style={{ fontSize: '10px', }}><b>About</b></td><td style={{ fontSize: '10px', }}><b>Follow Us</b></td><td style={{ fontSize: '10px', }}><b>Support</b></td></tr>
                        <tr><td style={{ fontSize: '10px', }}>About Betagro</td><td style={{ fontSize: '10px', }}><img src={facebookicon} alt="React Logo" style={{ width: 20, height: 20 }} />Facebook</td><td style={{ fontSize: '10px', }}><img src={contacticon} alt="React Logo" style={{ width: 20, height: 20 }} />1482</td></tr>
                        <tr><td style={{ fontSize: '10px', }}>Betagro Receipe</td><td style={{ fontSize: '10px', }}><img src={instagramicon} alt="React Logo" style={{ width: 20, height: 20 }} />Instagram</td><td style={{ fontSize: '10px', }}><img src={messageemailicon} alt="React Logo" style={{ width: 20, height: 20 }} />Contact Us</td></tr>
                        <tr><td></td><td style={{ fontSize: '10px', }}><img src={betgroonlineicon} alt="React Logo" style={{ width: 20, height: 20 }} />@betgroonline</td><td></td></tr>
                        <tr><td></td><td style={{ fontSize: '10px', }}><img src={betgrofoodicon} alt="React Logo" style={{ width: 20, height: 20 }} />@betgro.com</td><td></td></tr>
                    </table></td></tr></table></><b><hr></hr></b><br></br>@ 2022 Betgro Shop. All Rights Reserved .  Terms of Service  .Privacy Policy . Cookies Settings .</>
                </Card></center>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedFooter = connect(mapState, actionCreators)(Footer);
export { connectedFooter as Footer };