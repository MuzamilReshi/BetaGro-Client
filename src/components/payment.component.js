import React, { Component } from "react";
import PaymentDataService from "../services/payment.service";
import { withRouter } from '../common/with-router';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPayment = this.getPayment.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePayment = this.updatePayment.bind(this);
    this.deletePayment = this.deletePayment.bind(this);

    this.state = {
      currentPayment: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPayment(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPayment: {
          ...prevState.currentPayment,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentPayment: {
        ...prevState.currentPayment,
        description: description
      }
    }));
  }

  getPayment(id) {
    PaymentDataService.get(id)
      .then(response => {
        this.setState({
          currentPayment: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentPayment.id,
      title: this.state.currentPayment.title,
      description: this.state.currentPayment.description,
      published: status
    };

    PaymentDataService.update(this.state.currentPayment.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentPayment: {
            ...prevState.currentPayment,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePayment() {
    PaymentDataService.update(
      this.state.currentPayment.id,
      this.state.currentPayment
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The payment was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePayment() {    
    PaymentDataService.delete(this.state.currentPayment.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/payments');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPayment } = this.state;

    return (
      <div>
        {currentPayment ? (
          <div className="edit-form">
            <h4>Payment</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPayment.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPayment.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPayment.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentPayment.published ? (
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
              onClick={this.deletePayment}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePayment}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Payment...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Payment);