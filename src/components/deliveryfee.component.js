import React, { Component } from "react";
import DeliveryFeeDataService from "../services/deliveryfee.service";
import { withRouter } from '../common/with-router';

class DeliveryFee extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getDeliveryFee = this.getDeliveryFee.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateDeliveryFee = this.updateDeliveryFee.bind(this);
    this.deleteDeliveryFee = this.deleteDeliveryFee.bind(this);

    this.state = {
      currentDeliveryFee: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getDeliveryFee(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDeliveryFee: {
          ...prevState.currentDeliveryFee,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentDeliveryFee: {
        ...prevState.currentDeliveryFee,
        description: description
      }
    }));
  }

  getDeliveryFee(id) {
    DeliveryFeeDataService.get(id)
      .then(response => {
        this.setState({
          currentDeliveryFee: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentDeliveryFee.id,
      title: this.state.currentDeliveryFee.title,
      description: this.state.currentDeliveryFee.description,
      published: status
    };

    DeliveryFeeDataService.update(this.state.currentDeliveryFee.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentDeliveryFee: {
            ...prevState.currentDeliveryFee,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDeliveryFee() {
    DeliveryFeeDataService.update(
      this.state.currentDeliveryFee.id,
      this.state.currentDeliveryFee
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The deliveryfee was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDeliveryFee() {    
    DeliveryFeeDataService.delete(this.state.currentDeliveryFee.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/deliveryfees');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDeliveryFee } = this.state;

    return (
      <div>
        {currentDeliveryFee ? (
          <div className="edit-form">
            <h4>DeliveryFee</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentDeliveryFee.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentDeliveryFee.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentDeliveryFee.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentDeliveryFee.published ? (
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
              onClick={this.deleteDeliveryFee}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDeliveryFee}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a DeliveryFee...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(DeliveryFee);