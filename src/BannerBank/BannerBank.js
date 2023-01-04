import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';

import bankofbaroda from '../images/bankofbaroda.png';
import digibank from '../images/digibank.png';
import indusindbank from '../images/indusindbank.png';
import onecard from '../images/onecard.png';


class BannerBank extends React.Component {

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
    render() {
        const { user, users } = this.props;

        return (

            <div>
                <MDBCarousel showControls showIndicators light fade>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={1}
                        src={bankofbaroda}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>First slide label</h5>
                        <p style={{ color: 'black', }}>Bank Of Baroda.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={2}
                        src={digibank}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Second slide label</h5>
                        <p style={{ color: 'black', }}>Digi Bank.</p>
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={indusindbank}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Third slide label</h5>
                        <p style={{ color: 'black', }}>IndusInd Bank.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={onecard}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Fourth slide label</h5>
                        <p style={{ color: 'black', }}>One Card.</p>
                    </MDBCarouselItem>
                </MDBCarousel>  </div>

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

const connectedBannerBank = connect(mapState, actionCreators)(BannerBank);
export { connectedBannerBank as BannerBank };