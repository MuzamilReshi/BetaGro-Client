import React, { Component } from "react";
import AdjustmentDataService from "../services/adjustment.service";
import { Link } from "react-router-dom";

export default class AdjustmentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveAdjustments = this.retrieveAdjustments.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAdjustment = this.setActiveAdjustment.bind(this);
    this.removeAllAdjustments = this.removeAllAdjustments.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      adjustments: [],
      currentAdjustment: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveAdjustments();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveAdjustments() {
    AdjustmentDataService.getAll()
      .then(response => {
        this.setState({
          adjustments: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAdjustments();
    this.setState({
      currentAdjustment: null,
      currentIndex: -1
    });
  }

  setActiveAdjustment(adjustment, index) {
    this.setState({
      currentAdjustment: adjustment,
      currentIndex: index
    });
  }

  removeAllAdjustments() {
    AdjustmentDataService.deleteAll()
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
      currentAdjustment: null,
      currentIndex: -1
    });

    AdjustmentDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          adjustments: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, adjustments, currentAdjustment, currentIndex } = this.state;

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
          <h4>Adjustments List</h4>

          <ul className="list-group">
            {adjustments &&
              adjustments.map((adjustment, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveAdjustment(adjustment, index)}
                  key={index}
                >
                  {adjustment.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllAdjustments}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentAdjustment ? (
            <div>
              <h4>Adjustment</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentAdjustment.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentAdjustment.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentAdjustment.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/adjustments/" + currentAdjustment.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Adjustment...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
