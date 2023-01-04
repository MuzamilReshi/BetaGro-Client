import React, { Component } from "react";
import OutletDataService from "../services/outlet.service";
import { Link } from "react-router-dom";

export default class OutletsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveOutlets = this.retrieveOutlets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveOutlet = this.setActiveOutlet.bind(this);
    this.removeAllOutlets = this.removeAllOutlets.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      outlets: [],
      currentOutlet: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveOutlets();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveOutlets() {
    OutletDataService.getAll()
      .then(response => {
        this.setState({
          outlets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveOutlets();
    this.setState({
      currentOutlet: null,
      currentIndex: -1
    });
  }

  setActiveOutlet(outlet, index) {
    this.setState({
      currentOutlet: outlet,
      currentIndex: index
    });
  }

  removeAllOutlets() {
    OutletDataService.deleteAll()
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
      currentOutlet: null,
      currentIndex: -1
    });

    OutletDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          outlets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, outlets, currentOutlet, currentIndex } = this.state;

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
          <h4>Outlets List</h4>

          <ul className="list-group">
            {outlets &&
              outlets.map((outlet, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveOutlet(outlet, index)}
                  key={index}
                >
                  {outlet.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllOutlets}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentOutlet ? (
            <div>
              <h4>Outlet</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentOutlet.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentOutlet.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentOutlet.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/outlets/" + currentOutlet.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Outlet...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
