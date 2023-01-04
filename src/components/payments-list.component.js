import React, { Component } from "react";
import PaymentDataService from "../services/payment.service";
import { Link } from "react-router-dom";

export default class PaymentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievePayments = this.retrievePayments.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePayment = this.setActivePayment.bind(this);
    this.removeAllPayments = this.removeAllPayments.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      payments: [],
      currentPayment: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrievePayments();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrievePayments() {
    PaymentDataService.getAll()
      .then(response => {
        this.setState({
          payments: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievePayments();
    this.setState({
      currentPayment: null,
      currentIndex: -1
    });
  }

  setActivePayment(payment, index) {
    this.setState({
      currentPayment: payment,
      currentIndex: index
    });
  }

  removeAllPayments() {
    PaymentDataService.deleteAll()
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
      currentPayment: null,
      currentIndex: -1
    });

    PaymentDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          payments: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, payments, currentPayment, currentIndex } = this.state;

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
          <h4>Payments List</h4>

          <ul className="list-group">
            {payments &&
              payments.map((payment, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePayment(payment, index)}
                  key={index}
                >
                  {payment.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPayments}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPayment ? (
            <div>
              <h4>Payment</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentPayment.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentPayment.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPayment.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/payments/" + currentPayment.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Payment...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
