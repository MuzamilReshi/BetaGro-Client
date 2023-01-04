import React, { Component } from "react";
import TaxDataService from "../services/tax.service";
import { Link } from "react-router-dom";

export default class TaxsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTaxs = this.retrieveTaxs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTax = this.setActiveTax.bind(this);
    this.removeAllTaxs = this.removeAllTaxs.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      taxs: [],
      currentTax: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTaxs();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTaxs() {
    TaxDataService.getAll()
      .then(response => {
        this.setState({
          taxs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTaxs();
    this.setState({
      currentTax: null,
      currentIndex: -1
    });
  }

  setActiveTax(tax, index) {
    this.setState({
      currentTax: tax,
      currentIndex: index
    });
  }

  removeAllTaxs() {
    TaxDataService.deleteAll()
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
      currentTax: null,
      currentIndex: -1
    });

    TaxDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          taxs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, taxs, currentTax, currentIndex } = this.state;

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
          <h4>Taxs List</h4>

          <ul className="list-group">
            {taxs &&
              taxs.map((tax, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTax(tax, index)}
                  key={index}
                >
                  {tax.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTaxs}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTax ? (
            <div>
              <h4>Tax</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTax.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTax.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTax.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/taxs/" + currentTax.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tax...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
