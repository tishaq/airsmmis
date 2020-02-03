import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import Header from "./Header";
import Footer from "./Footer";
import { Async } from "react-async";
import { dateFormat, currencyFormat } from "./utils";
import errorImg from "./error.png";
import loadingImg from "./loading.gif";
import nodataImg from "./nodata.jpg";
import "react-datepicker/dist/react-datepicker.css";

class Summary extends Component {
  state = {
    singleDay: dateFormat(new Date()),
    rangeStartDate: dateFormat(new Date()),
    rangeStopDate: dateFormat(new Date())
  };
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this.state.rangeStartDate, nextState.rangeStartDate);

    if (this.state.rangeStartDate !== nextState.rangeStartDate) {
      return false;
    }

    return true;
  }
  render() {
    const getData = async () => {
      let nextToken = null;
      let results = [];
      let errors;
      let raw = {};
      let tickets = {};
      const startDay = this.state.rangeStartDate;
      const endDay = this.state.rangeStopDate;
      try {
        do {
          raw = await API.graphql(
            graphqlOperation(queries.listTickets, {
              filter: {
                date: {
                  between: [startDay, endDay]
                }
              },
              limit: 10000,
              nextToken: nextToken
            })
          );
          nextToken = raw.data.listTickets.nextToken;
          raw.data.listTickets.items.map(value => results.push(value));
        } while (nextToken);
        results.forEach(t => {
          if (!tickets[t.deviceName]) {
            tickets[t.deviceName] = [];
          }
          tickets[t.deviceName].push(parseInt(t.fee));
        });
      } catch (error) {
        errors = error;
      }

      return { tickets, errors };
    };
    const parseData = data => {
      let html = "";
      html += `
        <div class="card-list">
          <div class="card-title">Transction Summary ${this.state.rangeStartDate} ${this.state.rangeStopDate}</div>
          <div class="card-body">
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Revenue Source</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>`;
      let total = 0;
      Object.entries(data)
        .sort()
        .forEach((tck, index) => {
          const amount = tck[1].reduce((x, y) => x + y);
          html += ` <tr>
            <td>${index + 1}</td>
            <td>${tck[0]}</td>
            <td>${currencyFormat(amount)}</td>
          </tr>`;
          total += amount;
        });

      html += `<tr>
        <td>Grand Total</td>
        <td></td>
        <td>${currencyFormat(total)}</td>
      </tr>
         </tbody>
            </table>
          </div>
        </div>`;

      return (
        <div className="main" dangerouslySetInnerHTML={{ __html: html }}></div>
      );
    };

    const handleDateChangeStart = event => {
      console.log(event.target.value);
      this.setState({
        rangeStartDate: event.target.value
      });
    };

    const handleDateChangeEnd = event => {
      console.log(event.target.value);

      this.setState({
        rangeStopDate: event.target.value
      });
    };

    return (
      <>
        <Header />
        <div className="header">
          <form>
            <div className="search-items">
              <p>View Transaction Summary : </p>
              <div>
                From:
                <input
                  type="date"
                  name="singleDay"
                  min="2010-01-01"
                  value={this.state.rangeStartDate}
                  onChange={handleDateChangeStart}
                />
                To:
                <input
                  type="date"
                  name="singleDay"
                  min="2010-01-01"
                  value={this.state.rangeStopDate}
                  onChange={handleDateChangeEnd}
                />
              </div>
            </div>
          </form>
        </div>
        <Async promiseFn={getData}>
          {({ data, error, isPending }) => {
            if (isPending) {
              return (
                <div className="main">
                  <img src={loadingImg} alt="Loading ..." />
                </div>
              );
            }
            if (error) {
              console.log(error);
              return (
                <div className="main">
                  <img src={errorImg} alt="Error" />
                </div>
              );
            }
            if (data) {
              if (data.errors) {
                return (
                  <div className="main">
                    <img src={errorImg} alt="Error" />
                    <p>{data.errors.errors[0].message}</p>
                  </div>
                );
              } else {
                const result = parseData(data.tickets);
                if (result.props.dangerouslySetInnerHTML.__html !== "") {
                  return result;
                } else {
                  return (
                    <div className="main">
                      <img src={nodataImg} alt="No Data" />
                    </div>
                  );
                }
              }
            }
          }}
        </Async>
        <Footer />
      </>
    );
  }
}

export default Summary;
