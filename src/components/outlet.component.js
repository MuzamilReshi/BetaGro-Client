import React, { Component } from "react";
import OutletDataService from "../services/outlet.service";
import { withRouter } from '../common/with-router';

class Outlet extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getOutlet = this.getOutlet.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateOutlet = this.updateOutlet.bind(this);
    this.deleteOutlet = this.deleteOutlet.bind(this);

    this.state = {
      currentOutlet: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getOutlet(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentOutlet: {
          ...prevState.currentOutlet,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentOutlet: {
        ...prevState.currentOutlet,
        description: description
      }
    }));
  }

  getOutlet(id) {
    OutletDataService.get(id)
      .then(response => {
        this.setState({
          currentOutlet: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentOutlet.id,
      title: this.state.currentOutlet.title,
      description: this.state.currentOutlet.description,
      published: status
    };

    OutletDataService.update(this.state.currentOutlet.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentOutlet: {
            ...prevState.currentOutlet,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateOutlet() {
    OutletDataService.update(
      this.state.currentOutlet.id,
      this.state.currentOutlet
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The outlet was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteOutlet() {    
    OutletDataService.delete(this.state.currentOutlet.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/outlets');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentOutlet } = this.state;

    return (
      <div>
        {currentOutlet ? (
          <div className="edit-form">
            <h4>Outlet</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentOutlet.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentOutlet.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentOutlet.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentOutlet.published ? (
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
              onClick={this.deleteOutlet}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateOutlet}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Outlet...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Outlet);