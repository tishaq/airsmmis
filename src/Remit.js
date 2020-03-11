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
import RRRForm from "./RRRForm";

class Remit extends Component {
  state = {
    todayDate: new Date(),
    singleDay: dateFormat(new Date()),
    load: false,
    rrr: null,
    generateRRRurl:
      "https://remitademo.net/remita/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit"
  };
  render() {
    const getData = async ({ rrr, date, deviceName }) => {
      if (rrr !== null) {
        const result = await checkRRRStatus(rrr);

        console.log(typeof result, result);
        const html = `
        <div class="card-list">
        <div class="card-title">Payment Status: <i style="color: white"> ${
          result.message
        }</i></div>
        <div class="card-body">
       
          <table>
            
              <tr>
                <td>RRR Number</td>
                <td>${result.RRR}</td>       
          </tr>
          <tr>
                <td>Amount</td>
                <td>${currencyFormat(result.amount)}</td>       
          </tr>
          <tr>
                <td>Transaction Time</td>
                <td>${result.transactiontime}</td>       
          </tr>
          <tr>
                <td>Order Id:</td>
                <td>${result.orderId}</td>       
          </tr>
            </table>
            </div>
            </div>
        `;
        return {
          data: {
            result: <div dangerouslySetInnerHTML={{ __html: html }}></div>
          }
        };
      } else {
        let nextToken = null;
        let results = [];
        let errors;
        let raw = {};
        let tickets = {};
        let total = 0;
        console.log(date, deviceName);
        try {
          do {
            raw = await API.graphql(
              graphqlOperation(queries.listTickets, {
                filter: {
                  and: [
                    {
                      deviceName: {
                        eq: deviceName
                      }
                    },
                    {
                      date: {
                        beginsWith: date
                      }
                    }
                  ]
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

        return {
          data: {
            tickets: tickets,
            rrr: rrr,
            deviceName: deviceName,
            date: date
          },
          error: errors
        };
      }
    };
    const parseData = (data, rrr, deviceName, date) => {
      let html = "";
      if (rrr === undefined) {
        return <div dangerouslySetInnerHTML={{ __html: "" }}></div>;
      }
      html += `
      <div class="card-list">
        <div class="card-title">Payment for ${deviceName}<br> Generated RRR Number: <i style="color:white">${rrr}</i>  <br> Selected Date: ${date}</div>
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
          </table><br>
          
        </div>
      </div><h1 style="color:red">*Please save the RRR Number or print this page for your reference</h1>`;

      return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
    };

    const handleSubmit = event => {
      event.preventDefault();
      this.setState({ load: true });
    };
    const handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
    const checkRRRStatus = async rrr => {
      const merchantId = "2547916";
      const apiKey = "1946";
      const apiHash = CryptoJS.SHA512(rrr + apiKey + merchantId);
      const checkRRRStatusUrl = `https://cors-anywhere.herokuapp.com/https://remitademo.net/remita/ecomm/${merchantId}/${rrr}/${apiHash}/status.reg`;
      const response = await axios({
        url: checkRRRStatusUrl,
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `remitaConsumerKey=${merchantId},remitaConsumerToken=${apiHash}`,
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "XMLHttpRequest"
        }
      });

      return response.data;
    };
    const generateRRR = async amount => {
      const merchantId = "2547916";
      const apiKey = "1946";
      const serviceTypeId = "4430731";
      const d = new Date();
      const orderId = d.getTime() + "-1";
      const totalAmount = amount;

      const apiHash = CryptoJS.SHA512(
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
                id: data.rrr + orderId,
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
            <Async
              promiseFn={getData}
              rrr={this.state.rrr}
              date={this.state.singleDay}
              deviceName={this.state.deviceName}
            >
              {({ data, rrr, error, isPending }) => {
                if (isPending) {
                  return (
                    <center>
                      <img src={loadingImg} alt="Loading ..." />
                    </center>
                  );
                }
                if (error) {
                  return (
                    <div className="main">
                      <img src={errorImg} alt="Error" />
                      <p>{console.log(error)}</p>
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
                    let result = "";
                    console.log(data.data);
                    if (data.data.tickets) {
                      result = parseData(
                        data.data.tickets,
                        data.data.rrr,
                        data.data.deviceName,
                        data.data.date
                      );
                    } else {
                      result = data.data.result;
                    }
                    if (result.props.dangerouslySetInnerHTML.__html !== "") {
                      return result;
                    } else {
                      return (
                        <div className="card-list">
                          <div className="card-title">
                            No Record Available Try Again
                          </div>
                          <div className="card-body form-item">
                            <RRRForm
                              handleChange={handleChange}
                              handleSubmit={handleSubmit}
                              singleDay={this.state.singleDay}
                            />
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
              <div className="card-title">
                Use This form to generate RRR Number
              </div>
              <div
                className="card-body form-item"
                style={{ alignSelf: "center" }}
              >
                <RRRForm
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  singleDay={this.state.singleDay}
                />
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
