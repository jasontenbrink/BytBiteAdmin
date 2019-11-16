import React from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(
  class AddTenant extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        phone: ""
      };
    }
    render() {
      return (
        <div>
          <span>Name</span>
          <input
            type="text"
            name="vendor name"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
          <br />
          <span> address line 1</span>
          <input
            type="text"
            name="address line 1"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.addressLine1}
          />
          <br />
          <span> address line 2</span>
          <input
            type="text"
            name="address line2"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.addressLine2}
          />
          <br />
          <span> zip code</span>
          <input
            type="text"
            name="zipCode"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.zipCode}
          />
          <br />
          <span> phone</span>
          <input
            type="text"
            name="phone"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.phone}
          />
          <br />
          <span> City</span>
          <input
            type="text"
            name="city"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.city}
          />
          <br />
          <span> state</span>
          <input
            type="text"
            name="tenant name"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.state}
          />
          <br />
          <button
            onClick={() => {
              console.log("addTenants state", this.state);
              this.props.dispatch({
                type: "ADD_TENANT",
                value: this.state
              });
            }}
          >
            Add Tenant
          </button>
        </div>
      );
    }
  }
);
