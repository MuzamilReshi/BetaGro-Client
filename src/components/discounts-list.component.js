import React, { Component } from "react";
import DiscountDataService from "../services/discount.service";
import { Link } from "react-router-dom";

export default class DiscountsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveDiscounts = this.retrieveDiscounts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDiscount = this.setActiveDiscount.bind(this);
    this.removeAllDiscounts = this.removeAllDiscounts.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      discounts: [],
      currentDiscount: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveDiscounts();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveDiscounts() {
    DiscountDataService.getAll()
      .then(response => {
        this.setState({
          discounts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDiscounts();
    this.setState({
      currentDiscount: null,
      currentIndex: -1
    });
  }

  setActiveDiscount(discount, index) {
    this.setState({
      currentDiscount: discount,
      currentIndex: index
    });
  }

  removeAllDiscounts() {
    DiscountDataService.deleteAll()
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
      currentDiscount: null,
      currentIndex: -1
    });

    DiscountDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          discounts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, discounts, currentDiscount, currentIndex } = this.state;

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
          <h4>Discounts List</h4>

          <ul className="list-group">
            {discounts &&
              discounts.map((discount, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDiscount(discount, index)}
                  key={index}
                >
                  {discount.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDiscounts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentDiscount ? (
            <div>
              <h4>Discount</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentDiscount.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentDiscount.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentDiscount.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/discounts/" + currentDiscount.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Discount...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
