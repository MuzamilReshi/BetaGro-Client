import React, { Component } from "react";
import CouponDataService from "../services/coupon.service";
import { withRouter } from '../common/with-router';

class Coupon extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCoupon = this.getCoupon.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCoupon = this.updateCoupon.bind(this);
    this.deleteCoupon = this.deleteCoupon.bind(this);

    this.state = {
      currentCoupon: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCoupon(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCoupon: {
          ...prevState.currentCoupon,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCoupon: {
        ...prevState.currentCoupon,
        description: description
      }
    }));
  }

  getCoupon(id) {
    CouponDataService.get(id)
      .then(response => {
        this.setState({
          currentCoupon: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCoupon.id,
      title: this.state.currentCoupon.title,
      description: this.state.currentCoupon.description,
      published: status
    };

    CouponDataService.update(this.state.currentCoupon.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCoupon: {
            ...prevState.currentCoupon,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCoupon() {
    CouponDataService.update(
      this.state.currentCoupon.id,
      this.state.currentCoupon
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The coupon was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCoupon() {    
    CouponDataService.delete(this.state.currentCoupon.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/coupons');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCoupon } = this.state;

    return (
      <div>
        {currentCoupon ? (
          <div className="edit-form">
            <h4>Coupon</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCoupon.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCoupon.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentCoupon.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentCoupon.published ? (
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
              onClick={this.deleteCoupon}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCoupon}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Coupon...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Coupon);