import React, { Component } from "react";
import DiscountDataService from "../services/discount.service";
import { withRouter } from '../common/with-router';

class Discount extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getDiscount = this.getDiscount.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateDiscount = this.updateDiscount.bind(this);
    this.deleteDiscount = this.deleteDiscount.bind(this);

    this.state = {
      currentDiscount: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getDiscount(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentDiscount: {
          ...prevState.currentDiscount,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentDiscount: {
        ...prevState.currentDiscount,
        description: description
      }
    }));
  }

  getDiscount(id) {
    DiscountDataService.get(id)
      .then(response => {
        this.setState({
          currentDiscount: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentDiscount.id,
      title: this.state.currentDiscount.title,
      description: this.state.currentDiscount.description,
      published: status
    };

    DiscountDataService.update(this.state.currentDiscount.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentDiscount: {
            ...prevState.currentDiscount,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDiscount() {
    DiscountDataService.update(
      this.state.currentDiscount.id,
      this.state.currentDiscount
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The discount was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDiscount() {    
    DiscountDataService.delete(this.state.currentDiscount.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/discounts');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDiscount } = this.state;

    return (
      <div>
        {currentDiscount ? (
          <div className="edit-form">
            <h4>Discount</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentDiscount.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentDiscount.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentDiscount.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentDiscount.published ? (
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
              onClick={this.deleteDiscount}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDiscount}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Discount...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Discount);