import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import Avatar from 'react-avatar';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import {
    SearchBar
} from 'reactify-ui';
//import './style.css';
//import './style.scss';
import logobetagro from '../images/logobetagro.png';
import headerapplicationname from '../images/headerapplicationname.png';
import userprofileicon from '../images/userprofileicon.png';
import wishlisticon from '../images/wishlisticon.png';
import carticon from '../images/carticon.png';
import locationicon from '../images/locationicon.png';
import engicon from '../images/engicon.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from '@mui/joy/Card';

locationicon

class Header extends React.Component {

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
        render() {
            const { user, users } = this.props;

            return (

                <center>
                <Card variant="outlined" sx={{ width: 1010, backgroundColor: "white" }}>
                    <table><tr><td><img src={logobetagro} alt="React Logo" style={{ width: 60, height: 40 }} /></td><td><img src={headerapplicationname} alt="React Logo" style={{ width: 140, height: 25 }} />
                    <SearchBar style={{ fontSize: '15px' }} /></td><td>
                        <Menu menuButton={<MenuButton  ><img src={userprofileicon} alt="React Logo" style={{ width: 10, height: 10 }} />{/* <Avatar name="Wim Mostmans" size="30" /> */} </MenuButton>}>
                            <MenuItem style={{ fontSize: '15px' }}>My Account :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Basket : </MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Orders :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Smart Basket :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>Contact Us :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>Logout :</MenuItem>
                        </Menu></td><td><Menu menuButton={<MenuButton  ><img src={wishlisticon} alt="React Logo" style={{ width: 10, height: 10 }} />{/* <Avatar name="Wim Mostmans" size="30" /> */} </MenuButton>}>
                            <MenuItem style={{ fontSize: '15px' }}>My Account :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Basket : </MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Orders :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Smart Basket :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>Contact Us :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>Logout :</MenuItem>
                        </Menu></td>
                        <td><Menu menuButton={<MenuButton  ><img src={carticon} alt="React Logo" style={{ width: 10, height: 10 }} />{/* <Avatar name="Wim Mostmans" size="30" /> */} </MenuButton>}>
                            <MenuItem style={{ fontSize: '15px' }}>My Account :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Basket : </MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Orders :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Smart Basket :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>Contact Us :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>Logout :</MenuItem>
                        </Menu></td>
                        <td><Menu menuButton={<MenuButton  ><img src={engicon} alt="React Logo" style={{ width: 10, height: 10 }} />{/* <Avatar name="Wim Mostmans" size="30" /> */} </MenuButton>}>
                            <MenuItem style={{ fontSize: '15px' }}>My Account :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Basket : </MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Orders :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>My Smart Basket :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>Contact Us :</MenuItem>
                            <MenuItem style={{ fontSize: '15px' }}>Logout :</MenuItem>
                        </Menu></td>
                        <td>
                            <Menu style={{ fontSize: '8px' }} menuButton={<MenuButton ><span style={{ fontSize: '10px', fontStyle:'bold', color: 'green' }}>
                                <img src={locationicon} alt="React Logo" style={{ width: 20, height: 20 }} />Get it in 3 Hrs <br></br>Home :</span> </MenuButton>}>
                        <div><b>Select a Location For Delivery :</b>
                            <br></br>Choose your address location to see product
                            <br></br>availability and delivery options
                            <br></br><MenuItem  ><p style={{ fontSize: '15px', backgroundColor: 'black', color: 'white' }}>Home :
                                <br></br>Katha Chowdhury
                                <br></br> Flat No D 801 Century Infinity
                                <br></br> Bangalore Karnataka </p></MenuItem>
                            <br></br><u><a href="#">View all addresses </a></u>&nbsp;&nbsp;&nbsp;&nbsp;<u><a href="#"> + Add Address</a></u>
                            <br></br>--- or search for a new location ---
                            <br></br><SearchBar style={{ fontSize: '15px' }} /></div>
                    </Menu></td></tr></table>
                    <table><tr><td>{/* <Menu menuButton={<MenuButton style={{
                        backgroundColor: 'lightgreen',
                    }}>Shop By Category</MenuButton>}>
                        <SubMenu label="Fruits & Vegetables" >
                            <SubMenu label="Cuts & Sprouts">
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Cuts & Peeled Veggies </MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Cut Fruits & tender Coconut</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Fresh Salad & Sprouts</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Recipe Packs</MenuItem>
                            </SubMenu>
                            <SubMenu label="Exotic Fruits & Veggies">
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Exotic Fruits </MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Exotic Vegetables</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Other Exotic Items</MenuItem>
                            </SubMenu>
                            <SubMenu label="Flower Bouquets & Brunches">
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Marigold </MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Other Flowers</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Roses</MenuItem>
                            </SubMenu>
                            <SubMenu label="Fresh Fruits">
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Apple & pomegranate </MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Banana, Sopata Papaya</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Kiwi , Melon Citrius Fruits</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Mangoes</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Seasonal Fruits</MenuItem>
                            </SubMenu>
                            <SubMenu label="Fresh Vegetables">
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Beans, Brinjal & Okra </MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Cabage & Cauliflower</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Cucumber & Capsicum</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Ground ,Pumpkin & Drum Stick</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Leafy Vegetables</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Potato, Onion & Tomato</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Root Vegetables</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Speciality</MenuItem>
                            </SubMenu>
                            <SubMenu label="Herbs & Seasoning">
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Indian & Exotic Hebs </MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Lemon , Ginder & Garlic </MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Roses</MenuItem>
                            </SubMenu>
                            <SubMenu label="Organic Fruits & Vegetables">
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Organic Fruits </MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Organic Vegetables</MenuItem>
                                <MenuItem style={{
                                    backgroundColor: 'lightpink',
                                }}>Other Organic Items</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu label="FoodGrains , Oil & Masala">
                            <MenuItem  >index.html</MenuItem>
                            <MenuItem>example.js</MenuItem>
                            <SubMenu label="Bakery , Cakes & Diary">
                                <MenuItem>about.css</MenuItem>
                                <MenuItem>home.css</MenuItem>
                                <MenuItem>index.css</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu label="Bakery , Cakes & Diary">
                            <MenuItem>index.html</MenuItem>
                            <MenuItem>example.js</MenuItem>
                            <SubMenu label="Bakery , Cakes & Diary">
                                <MenuItem>about.css</MenuItem>
                                <MenuItem>home.css</MenuItem>
                                <MenuItem>index.css</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu label="Beverages">
                            <MenuItem>index.html</MenuItem>
                            <MenuItem>example.js</MenuItem>
                            <SubMenu label="Bakery , Cakes & Diary">
                                <MenuItem>about.css</MenuItem>
                                <MenuItem>home.css</MenuItem>
                                <MenuItem>index.css</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu label="Snacks and Branded Foods">
                            <MenuItem>index.html</MenuItem>
                            <MenuItem>example.js</MenuItem>
                            <SubMenu label="Bakery , Cakes & Diary">
                                <MenuItem>about.css</MenuItem>
                                <MenuItem>home.css</MenuItem>
                                <MenuItem>index.css</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu label="Beauty & Hygiene">
                            <MenuItem>index.html</MenuItem>
                            <MenuItem>example.js</MenuItem>
                            <SubMenu label="Bakery , Cakes & Diary">
                                <MenuItem>about.css</MenuItem>
                                <MenuItem>home.css</MenuItem>
                                <MenuItem>index.css</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu label="Cleaning and Household">
                            <MenuItem>index.html</MenuItem>
                            <MenuItem>example.js</MenuItem>
                            <SubMenu label="Bakery , Cakes & Diary">
                                <MenuItem>about.css</MenuItem>
                                <MenuItem>home.css</MenuItem>
                                <MenuItem>index.css</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu label="Kichen Garden and Pets">
                            <MenuItem>index.html</MenuItem>
                            <MenuItem>example.js</MenuItem>
                            <SubMenu label="Bakery , Cakes & Diary">
                                <MenuItem>about.css</MenuItem>
                                <MenuItem>home.css</MenuItem>
                                <MenuItem>index.css</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu label="Eggs ,Meat & Fish">
                            <MenuItem>index.html</MenuItem>
                            <MenuItem>example.js</MenuItem>
                            <SubMenu label="Bakery , Cakes & Diary">
                                <MenuItem>about.css</MenuItem>
                                <MenuItem>home.css</MenuItem>
                                <MenuItem>index.css</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu label="Gourmet & World Food ">
                            <MenuItem>index.html</MenuItem>
                            <MenuItem>example.js</MenuItem>
                            <SubMenu label="Bakery , Cakes & Diary">
                                <MenuItem>about.css</MenuItem>
                                <MenuItem>home.css</MenuItem>
                                <MenuItem>index.css</MenuItem>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu label="Baby Care ">
                            <MenuItem>index.html</MenuItem>
                            <MenuItem>example.js</MenuItem>
                            <SubMenu label="Bakery , Cakes & Diary">
                                <MenuItem>about.css</MenuItem>
                                <MenuItem>home.css</MenuItem>
                                <MenuItem>index.css</MenuItem>
                            </SubMenu>
                        </SubMenu>
                    </Menu> */}</td><td><b><Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                        <Container>
                            <Navbar.Brand href="#home">Home</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="#home">Exotic Fruits & Vegetables</Nav.Link>
                                    <Nav.Link href="#link">Tea</Nav.Link>
                                    <Nav.Link href="#link">Ghee</Nav.Link>
                                    <Nav.Link href="#link">Nandini</Nav.Link>
                                    <NavDropdown title=">>" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Kellogs</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Milk
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Yogurt & Srikhand</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">Chocolates</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">Cup Noodles</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">Hair Care</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">Fresh Chicken</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">Eggs</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.4">Honey</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar></b></td></tr></table>  </Card><br></br></center>

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

const connectedHeader = connect(mapState, actionCreators)(Header);
export { connectedHeader as Header };