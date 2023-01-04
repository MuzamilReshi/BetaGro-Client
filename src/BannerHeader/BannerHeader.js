import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';

import diary from '../images/diary.png';
import freshomeat from '../images/freshomeat.png';
import Homekitchen from '../images/Home&kitchen.png';
import snacks from '../images/snacks.png';
import staples from '../images/staples.png';
import cake from '../images/cake.png';
import christmas from '../images/christmas.png';
import pampers from '../images/pampers.png';
import pets from '../images/pets.png';
import sofit from '../images/sofit.png';
import tresemme from '../images/tresemme.png';

class BannerHeader extends React.Component {

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
                        src={staples}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>First slide label</h5>
                        <p style={{ color: 'black', }}>Staples.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={2}
                        src={diary}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Second slide label</h5>
                        <p style={{ color: 'black', }}>Diary.</p>
                    </MDBCarouselItem>

                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={snacks}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Third slide label</h5>
                        <p style={{ color: 'black', }}>Snacks.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={Homekitchen}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Fourth slide label</h5>
                        <p style={{ color: 'black', }}>Home & kitchen.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={freshomeat}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Fifth slide label</h5>
                        <p style={{ color: 'black', }}>Fresho Meat.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={cake}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Sixth slide label</h5>
                        <p style={{ color: 'black', }}>Cake.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={christmas}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Seven slide label</h5>
                        <p style={{ color: 'black', }}>Christmas.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={pampers}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Eight slide label</h5>
                        <p style={{ color: 'black', }}>Pampers.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={pets}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Ninth slide label</h5>
                        <p style={{ color: 'black', }}>Pets.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={sofit}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Tenth slide label</h5>
                        <p style={{ color: 'black', }}>Sofit.</p>
                    </MDBCarouselItem>
                    <MDBCarouselItem
                        className='w-100 d-block'
                        itemId={3}
                        src={tresemme}
                        alt='...'
                    >
                        <h5 style={{ color: 'black', }}>Eleven slide label</h5>
                        <p style={{ color: 'black', }}>Tresemme</p>
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

const connectedBannerHeader = connect(mapState, actionCreators)(BannerHeader);
export { connectedBannerHeader as BannerHeader };