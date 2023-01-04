import React, { Component } from "react";
import DeliveryFeeDataService from "../services/deliveryfee.service";
import { Link } from "react-router-dom";

export default class DeliveryFeesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveDeliveryFees = this.retrieveDeliveryFees.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveDeliveryFee = this.setActiveDeliveryFee.bind(this);
    this.removeAllDeliveryFees = this.removeAllDeliveryFees.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      deliveryfees: [],
      currentDeliveryFee: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveDeliveryFees();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveDeliveryFees() {
    DeliveryFeeDataService.getAll()
      .then(response => {
        this.setState({
          deliveryfees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveDeliveryFees();
    this.setState({
      currentDeliveryFee: null,
      currentIndex: -1
    });
  }

  setActiveDeliveryFee(deliveryfee, index) {
    this.setState({
      currentDeliveryFee: deliveryfee,
      currentIndex: index
    });
  }

  removeAllDeliveryFees() {
    DeliveryFeeDataService.deleteAll()
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
      currentDeliveryFee: null,
      currentIndex: -1
    });

    DeliveryFeeDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          deliveryfees: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, deliveryfees, currentDeliveryFee, currentIndex } = this.state;

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
          <h4>DeliveryFees List</h4>

          <ul className="list-group">
            {deliveryfees &&
              deliveryfees.map((deliveryfee, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveDeliveryFee(deliveryfee, index)}
                  key={index}
                >
                  {deliveryfee.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllDeliveryFees}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentDeliveryFee ? (
            <div>
              <h4>DeliveryFee</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentDeliveryFee.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentDeliveryFee.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentDeliveryFee.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/deliveryfees/" + currentDeliveryFee.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a DeliveryFee...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
