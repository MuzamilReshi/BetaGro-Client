import React, { Component } from "react";
import CouponDataService from "../services/coupon.service";
import { Link } from "react-router-dom";

export default class CouponsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCoupons = this.retrieveCoupons.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCoupon = this.setActiveCoupon.bind(this);
    this.removeAllCoupons = this.removeAllCoupons.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      coupons: [],
      currentCoupon: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveCoupons();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveCoupons() {
    CouponDataService.getAll()
      .then(response => {
        this.setState({
          coupons: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCoupons();
    this.setState({
      currentCoupon: null,
      currentIndex: -1
    });
  }

  setActiveCoupon(coupon, index) {
    this.setState({
      currentCoupon: coupon,
      currentIndex: index
    });
  }

  removeAllCoupons() {
    CouponDataService.deleteAll()
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
      currentCoupon: null,
      currentIndex: -1
    });

    CouponDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          coupons: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, coupons, currentCoupon, currentIndex } = this.state;

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
          <h4>Coupons List</h4>

          <ul className="list-group">
            {coupons &&
              coupons.map((coupon, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCoupon(coupon, index)}
                  key={index}
                >
                  {coupon.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCoupons}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCoupon ? (
            <div>
              <h4>Coupon</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentCoupon.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCoupon.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCoupon.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/coupons/" + currentCoupon.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Coupon...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
