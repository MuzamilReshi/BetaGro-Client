import React, { Component } from "react";
import AdjustmentDataService from "../services/adjustment.service";
import { withRouter } from '../common/with-router';

class Adjustment extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getAdjustment = this.getAdjustment.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateAdjustment = this.updateAdjustment.bind(this);
    this.deleteAdjustment = this.deleteAdjustment.bind(this);

    this.state = {
      currentAdjustment: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getAdjustment(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAdjustment: {
          ...prevState.currentAdjustment,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentAdjustment: {
        ...prevState.currentAdjustment,
        description: description
      }
    }));
  }

  getAdjustment(id) {
    AdjustmentDataService.get(id)
      .then(response => {
        this.setState({
          currentAdjustment: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentAdjustment.id,
      title: this.state.currentAdjustment.title,
      description: this.state.currentAdjustment.description,
      published: status
    };

    AdjustmentDataService.update(this.state.currentAdjustment.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentAdjustment: {
            ...prevState.currentAdjustment,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAdjustment() {
    AdjustmentDataService.update(
      this.state.currentAdjustment.id,
      this.state.currentAdjustment
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The adjustment was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAdjustment() {    
    AdjustmentDataService.delete(this.state.currentAdjustment.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/adjustments');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAdjustment } = this.state;

    return (
      <div>
        {currentAdjustment ? (
          <div className="edit-form">
            <h4>Adjustment</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentAdjustment.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentAdjustment.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentAdjustment.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentAdjustment.published ? (
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
              onClick={this.deleteAdjustment}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAdjustment}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Adjustment...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Adjustment);