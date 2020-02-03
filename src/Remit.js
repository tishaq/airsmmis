import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
import * as mutations from "./graphql/mutations";
import Header from "./Header";
import Footer from "./Footer";
import { Async } from "react-async";
import { dateFormat, currencyFormat } from "./utils";
import errorImg from "./error.png";
import loadingImg from "./loading.gif";
import axios from "axios";
import CryptoJS from "crypto-js";
import "react-datepicker/dist/react-datepicker.css";

class Remit extends Component {
  state = {
    todayDate: new Date(),
    singleDay: dateFormat(new Date()),
    load: false,
    rrr: "",
    generateRRRurl:
      "https://remitademo.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit"
  };
  render() {
    const getData = async ({ date }) => {
      let nextToken = null;
      let results = [];
      let errors;
      let raw = {};
      let tickets = {};
      let total = 0;

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
          if (!tickets[t.receiptType]) {
            tickets[t.receiptType] = [];
          }
          tickets[t.receiptType].push(parseInt(t.fee));
          total += parseInt(t.fee);
        });
      } catch (error) {
        errors = error;
      }
      const rrr = await generateRRR(total);

      return { data: { tickets: tickets, rrr: rrr }, error: errors };
    };
    const parseData = (data, rrr) => {
      let html = "";
      html += `
      <div class="card-list">
        <div class="card-title">RRR Number: ${rrr}</div>
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

      return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
    };

    const handleSubmit = event => {
      event.preventDefault();
      this.setState({ load: true });
    };
    const handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
    const generateRRR = async amount => {
      const merchantId = "2547916";
      const apiKey = "1946";
      const serviceTypeId = "4430731";
      const d = new Date();
      const orderId = d.getTime() + "-1";
      const totalAmount = amount;

      var apiHash = CryptoJS.SHA512(
        merchantId + serviceTypeId + orderId + totalAmount + apiKey
      );
      let generatedRRR;
      const response = await axios({
        url: this.state.generateRRRurl,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `remitaConsumerKey=${merchantId},remitaConsumerToken=${apiHash}`,
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest"
        },
        data: {
          serviceTypeId: `${serviceTypeId}`,
          amount: `${totalAmount}`,
          orderId: `${orderId}`,
          payerName: `${this.state.name}`,
          payerEmail: `${this.state.email}`,
          payerPhone: `${this.state.phone}`,
          hash: `${apiHash}`
        }
      });
      if (typeof response.data !== "object") {
        let data = response.data;
        data = String(data).substring(
          data.indexOf("{"),
          data.lastIndexOf("}") + 1
        );
        data = JSON.parse(data);
        if (data.statuscode === "025") {
          generatedRRR = data.RRR;
          const mutate = await API.graphql(
            graphqlOperation(mutations.createRemita, {
              input: {
                rrr: data.RRR,
                date: dateFormat(new Date()),
                totalAmount: totalAmount,
                payerName: this.state.name,
                payerEmail: this.state.email,
                payerPhone: this.state.phone,
                status: false
              }
            })
          );
          console.log(mutate);
        }
      }

      return generatedRRR;
    };
    return (
      <>
        <Header />
        <div className="header"></div>
        <div className="main">
          {this.state.load ? (
            <Async promiseFn={getData} date={this.state.singleDay}>
              {({ data, rrr, error, isPending }) => {
                if (isPending) {
                  return <img src={loadingImg} alt="Loading ..." />;
                }
                if (error) {
                  return (
                    <>
                      <img src={errorImg} alt="Error" />
                    </>
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
                    const result = parseData(data.data.tickets, data.data.rrr);
                    if (result.props.dangerouslySetInnerHTML.__html !== "") {
                      return result;
                    } else {
                      return (
                        <div className="card-list">
                          <div className="card-title">Generate RRR</div>
                          <div className="card-body form-item">
                            <form onSubmit={handleSubmit} method="post">
                              <label>No Data for this Date</label>
                              <input
                                type="date"
                                name="singleDay"
                                min="2010-01-01"
                                value={this.state.singleDay}
                                onChange={handleChange}
                                required
                              />
                              <input
                                type="text"
                                onChange={handleChange}
                                placeholder="Name"
                                name="name"
                                required
                              />
                              <input
                                type="email"
                                onChange={handleChange}
                                placeholder="email"
                                name="email"
                                required
                              />
                              <input
                                type="text"
                                onChange={handleChange}
                                placeholder="Phone No"
                                name="phone"
                                required
                              />
                              <br />
                              <input
                                name="generaterrr"
                                type="submit"
                                value="Generate RRR"
                              />
                            </form>
                          </div>
                        </div>
                      );
                    }
                  }
                }
              }}
            </Async>
          ) : (
            <div className="card-list">
              <div className="card-title">Generate RRR</div>
              <div className="card-body form-item">
                <form onSubmit={handleSubmit} method="post">
                  <input
                    type="date"
                    name="singleDay"
                    min="2010-01-01"
                    value={this.state.singleDay}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Name"
                    name="name"
                    required
                  />
                  <input
                    type="email"
                    onChange={handleChange}
                    placeholder="email"
                    name="email"
                    required
                  />
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Phone No"
                    name="phone"
                    required
                  />
                  <br />
                  <input
                    name="generaterrr"
                    type="submit"
                    value="Generate RRR"
                  />
                </form>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default Remit;
