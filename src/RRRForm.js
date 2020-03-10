import React, { Component } from "react";

export default class RRRForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit} method="post">
          <input
            type="date"
            name="singleDay"
            min="2010-01-01"
            value={this.props.singleDay}
            onChange={this.props.handleChange}
            required
          />
          <select onChange={this.props.handleChange} name="deviceName">
            <option>-- Select Item --</option>
            <option value="Gate 1">Gate 1</option>
            <option value="Gate 2">Gate 2</option>
            <option value="Gate 3">Gate 3</option>
            <option value="Gate 4">Gate 4</option>
            <option value="Gate 5">Gate 5</option>
            <option value="Gate 6">Gate 6</option>
            <option value="Facility 1">Facility 1</option>
            <option value="Facility 2">Facility 2</option>
            <option value="Facility 3">Facility 3</option>
          </select>
          <input
            type="text"
            onChange={this.props.handleChange}
            placeholder="Name"
            name="name"
            required
          />
          <input
            type="email"
            onChange={this.props.handleChange}
            placeholder="email"
            name="email"
            required
          />
          <input
            type="text"
            onChange={this.props.handleChange}
            placeholder="Phone No"
            name="phone"
            required
          />
          <br />
          <input name="generaterrr" type="submit" value="Generate RRR" />
        </form>
        <br />
        <center>OR</center>
        <br />
        <form onSubmit={this.props.handleSubmit} method="post">
          <input
            type="text"
            onChange={this.props.handleChange}
            placeholder="RRR Number"
            name="rrr"
            required
          />
          <input
            name="checkStatus"
            type="submit"
            value="Check Payment Status"
          />
        </form>
      </div>
    );
  }
}
