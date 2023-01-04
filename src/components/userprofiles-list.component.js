import React, { Component } from "react";
import UserProfileDataService from "../services/userprofile.service";
import { Link } from "react-router-dom";

export default class UserProfilesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveUserProfiles = this.retrieveUserProfiles.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUserProfile = this.setActiveUserProfile.bind(this);
    this.removeAllUserProfiles = this.removeAllUserProfiles.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      userprofiles: [],
      currentUserProfile: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveUserProfiles();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveUserProfiles() {
    UserProfileDataService.getAll()
      .then(response => {
        this.setState({
          userprofiles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUserProfiles();
    this.setState({
      currentUserProfile: null,
      currentIndex: -1
    });
  }

  setActiveUserProfile(userprofile, index) {
    this.setState({
      currentUserProfile: userprofile,
      currentIndex: index
    });
  }

  removeAllUserProfiles() {
    UserProfileDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentUserProfile: null,
      currentIndex: -1
    });

    UserProfileDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          userprofiles: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, userprofiles, currentUserProfile, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>UserProfiles List</h4>

          <ul className="list-group">
            {userprofiles &&
              userprofiles.map((userprofile, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUserProfile(userprofile, index)}
                  key={index}
                >
                  {userprofile.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUserProfiles}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentUserProfile ? (
            <div>
              <h4>UserProfile</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentUserProfile.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentUserProfile.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentUserProfile.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/userprofiles/" + currentUserProfile.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a UserProfile...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
