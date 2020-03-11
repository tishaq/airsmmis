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
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  state = {
    todayDate: new Date(),
    singleDay: new Date()
  };
  render() {
    const getData = async () => {
      let nextToken = null;
      let results = [];
      let errors;
      let raw = {};
      let tickets = {};
      const date = dateFormat(this.state.singleDay);

      try {
        do {
          raw = await API.graphql(
            graphqlOperation(queries.listTickets, {
              filter: {
                date: {
                  beginsWith: date
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
            tickets[t.deviceName] = {};
          }
          if (!tickets[t.deviceName][t.receiptType]) {
            tickets[t.deviceName][t.receiptType] = {};
          }
          if (!tickets[t.deviceName][t.receiptType][t.itemType]) {
            tickets[t.deviceName][t.receiptType][t.itemType] = [];
          }
          tickets[t.deviceName][t.receiptType][t.itemType].push(
            parseInt(t.fee)
          );
        });
      } catch (error) {
        errors = error;
      }
      return { tickets, errors };
    };
    const parseData = data => {
      let html = "";
      Object.entries(data)
        .sort()
        .forEach(tck => {
          let total = 0;
          html += `<div class="card">
            <div class="card-title">${tck[0]}</div>
            <div class="card-body">
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Item Name</th>
                    <th>Fee</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                  </tr>
                </thead>`;

          Object.entries(tck[1])
            .sort()
            .forEach(cat => {
              html += ` <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>${cat[0]}</td>
                      <td></td>
                      <td></td>
                    </tr>`;
              Object.entries(cat[1])
                .sort()
                .forEach((item, index) => {
                  const amount = item[1].reduce((x, y) => x + y);
                  html += ` <tr>
                        <td>${index + 1}</td>
                        <td>${item[0]}</td>
                        <td>${currencyFormat(item[1][0])}</td>
                        <td>${item[1].length}</td>
                        <td>${currencyFormat(amount)}</td>
                      </tr>`;
                  total += amount;
                });
              html += `<tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total</td>
                <td>${currencyFormat(total)}</td>
              </tr>
                </tbody>`;
            });
          html += ` </table>
            </div>
          </div>`;
        });
      return (
        <div className="main" dangerouslySetInnerHTML={{ __html: html }}></div>
      );
    };
    const handleDateChange = datetime => {
      this.setState({
        singleDay: datetime
      });
    };

    return (
      <>
        <Header />
        <div className="header">
          <form>
            <div className="search-items">
              <p>Select date to view transaction summary</p>

              <div>
                <Datepicker
                  selected={this.state.singleDay}
                  onChange={handleDateChange}
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
                  <center>
                    <img src={loadingImg} alt="Loading ..." />
                  </center>
                </div>
              );
            }
            if (error) {
              return (
                <div className="main">
                  <center>
                    <img src={errorImg} alt="Loading ..." />
                  </center>
                </div>
              );
            }
            if (data) {
              if (data.errors === null) {
                return (
                  <div className="main">
                    <center>
                      <img src={errorImg} alt="Error" />
                      <p>{data.errors.errors[0].message}</p>
                    </center>
                  </div>
                );
              } else {
                const result = parseData(data.tickets);
                if (result.props.dangerouslySetInnerHTML.__html !== "") {
                  return result;
                } else {
                  return (
                    <div className="main">
                      <center>
                        <img src={nodataImg} alt="No Data" />
                      </center>
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

export default App;
