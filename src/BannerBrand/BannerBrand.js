import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';

import amul from '../images/amul.png';
import detol from '../images/detol.png';
import durex from '../images/durex.png';
import harpic from '../images/harpic.png';
import lindberg from '../images/lindberg.png';
import tasties from '../images/tasties.png';


class BannerBrand extends React.Component {

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
                        src={amul}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>First slide label</h5>
                        <p style={{ color: 'black', }}>Amul.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={2}
                        src={detol}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Second slide label</h5>
                        <p style={{ color: 'black', }}>Detol.</p>
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={durex}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Third slide label</h5>
                        <p style={{ color: 'black', }}>Durex.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={harpic}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Fourth slide label</h5>
                        <p style={{ color: 'black', }}>Harpic.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={lindberg}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Fifth slide label</h5>
                        <p style={{ color: 'black', }}>Lindberg.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={tasties}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Sixth slide label</h5>
                        <p style={{ color: 'black', }}>Tasties.</p>
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

const connectedBannerBrand = connect(mapState, actionCreators)(BannerBrand);
export { connectedBannerBrand as BannerBrand };