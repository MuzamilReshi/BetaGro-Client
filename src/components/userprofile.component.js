import React, { Component } from "react";
import UserProfileDataService from "../services/userprofile.service";
import { withRouter } from '../common/with-router';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
    this.deleteUserProfile = this.deleteUserProfile.bind(this);

    this.state = {
      currentUserProfile: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUserProfile(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUserProfile: {
          ...prevState.currentUserProfile,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentUserProfile: {
        ...prevState.currentUserProfile,
        description: description
      }
    }));
  }

  getUserProfile(id) {
    UserProfileDataService.get(id)
      .then(response => {
        this.setState({
          currentUserProfile: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentUserProfile.id,
      title: this.state.currentUserProfile.title,
      description: this.state.currentUserProfile.description,
      published: status
    };

    UserProfileDataService.update(this.state.currentUserProfile.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentUserProfile: {
            ...prevState.currentUserProfile,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUserProfile() {
    UserProfileDataService.update(
      this.state.currentUserProfile.id,
      this.state.currentUserProfile
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The userprofile was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUserProfile() {    
    UserProfileDataService.delete(this.state.currentUserProfile.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/userprofiles');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUserProfile } = this.state;

    return (
      <div>
        {currentUserProfile ? (
          <div className="edit-form">
            <h4>UserProfile</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentUserProfile.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentUserProfile.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentUserProfile.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentUserProfile.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUserProfile}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUserProfile}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a UserProfile...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(UserProfile);