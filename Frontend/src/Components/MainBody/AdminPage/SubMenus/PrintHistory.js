import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import apiEndpoint from "../../../../globalVariables/apiEndpint";

import GraphQlConfig from "../../../Api/GraphQuery";

import Formatter from "../../../Classes/FrontendFormatter/Formatter";

const formatter = new Formatter();

var axios = require("axios");
const downloadPdf = (printactionId) => {
  var config = {
    method: "get",
    url: `${apiEndpoint}/api/getlabels?type=pdf&loghistoryid=${printactionId}`,
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "blob",
  };

  axios(config)
    .then(function (response) {
      const blob = new Blob([response.data], {
        type: "application/pdf" || "application/octet-stream",
      });
      const blobURL = window.URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.style.display = "none";
      tempLink.href = blobURL;
      tempLink.setAttribute("download", `${new Date().getTime()}.pdf`);

      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(blobURL);
      }, 5000);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const downloadLogFile = (printactionId) => {
  var config = {
    method: "get",
    url: `${apiEndpoint}/api/getlabels?type=logFile&loghistoryid=${printactionId}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));

      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(response.data, null, 4)], {
        type: "text/plain;charset=utf-8",
      });
      element.href = URL.createObjectURL(file);
      element.download = `${printactionId}_report.txt`;
      document.body.appendChild(element);
      element.click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

const PrintHistory = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const [searchedOrderId, setSearchedOrderId] = useState("");
  let timefired = null;

  const getOrders = () => {
    clearTimeout(timefired);
    timefired = setTimeout(
      function () {
        let queryExtender;

        searchedOrderId ? (queryExtender = `(orderId:${searchedOrderId})`) : (queryExtender = "");

        const getOrdersQuery = `{getPrintActionHistory ${queryExtender}{printactionId,logHistory{orderId,successful}}}`;

        axios(GraphQlConfig(getOrdersQuery))
          .then(function (response) {
            setApiResponse(response.data.data.getPrintActionHistory);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      searchedOrderId ? 500 : 0
    );
  };

  useEffect(() => {
    getOrders();
  }, [searchedOrderId]);
  return (
    <div>
      <div className="searchBar" style={{ width: "35rem" }}>
        <input
          style={{ width: "24rem" }}
          type="number"
          value={searchedOrderId}
          placeholder="Search LogHistory by OrderId"
          onChange={(e) => setSearchedOrderId(e.target.value)}
        />
      </div>
      Last 20 actions
      <ul style={{ width: "40rem" }}>
        {apiResponse.map((a) => {
          let successFulOrdersArray = [];

          let failedOrdersArray = [];

          a.logHistory.map((a) => {
            a.successful == 0 ? failedOrdersArray.push(a.orderId) : successFulOrdersArray.push(a.orderId);
          });

          let logFilecolor;

          successFulOrdersArray.length > 0 ? (logFilecolor = "Green") : (logFilecolor = "Red");

          failedOrdersArray.length > 0 ? (logFilecolor == "Green" ? (logFilecolor = "Orange") : "") : "";

          return (
            <li>
              <div
                style={{
                  width: "30rem",
                  height: "7rem",
                  marginBottom: "1rem",
                  border: "1px solid #aeaeae",
                  borderRadius: ".625rem",
                  boxShadow: "0 5px 10px 0 rgb(0 0 0 / 15%)",
                }}
              >
                <span>Creation Date:{formatter.timeConverter(a.printactionId)}</span>

                <br />
                <i
                  className="align left icon"
                  onClick={() => {
                    downloadLogFile(a.printactionId);
                  }}
                  style={{ float: "right", width: "6rem", fontSize: "4rem", cursor: "pointer", color: logFilecolor }}
                ></i>
                <i
                  className="file pdf outline icon"
                  onClick={() => {
                    downloadPdf(a.printactionId);
                  }}
                  style={{ float: "right", width: "6rem", fontSize: "4rem", cursor: "pointer", display: successFulOrdersArray.length < 1 ? "none" : "" }}
                ></i>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PrintHistory;
