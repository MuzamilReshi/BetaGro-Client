import React, { Component } from "react";
import TaxDataService from "../services/tax.service";
import { withRouter } from '../common/with-router';

class Tax extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTax = this.getTax.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTax = this.updateTax.bind(this);
    this.deleteTax = this.deleteTax.bind(this);

    this.state = {
      currentTax: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTax(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTax: {
          ...prevState.currentTax,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTax: {
        ...prevState.currentTax,
        description: description
      }
    }));
  }

  getTax(id) {
    TaxDataService.get(id)
      .then(response => {
        this.setState({
          currentTax: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTax.id,
      title: this.state.currentTax.title,
      description: this.state.currentTax.description,
      published: status
    };

    TaxDataService.update(this.state.currentTax.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTax: {
            ...prevState.currentTax,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTax() {
    TaxDataService.update(
      this.state.currentTax.id,
      this.state.currentTax
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The tax was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTax() {    
    TaxDataService.delete(this.state.currentTax.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/taxs');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTax } = this.state;

    return (
      <div>
        {currentTax ? (
          <div className="edit-form">
            <h4>Tax</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTax.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTax.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTax.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTax.published ? (
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
              onClick={this.deleteTax}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTax}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tax...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Tax);