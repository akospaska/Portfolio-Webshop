import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AdminOrderItem from "./AdminOrderItem/AdminOrderItem";
import apiEndpoint from "../../../../globalVariables/apiEndpint";

import BackendRESTrequest from "../../../Api/BackendRESTrequest";

import GraphQlConfig from "../../../Api/GraphQuery";
import { Sidebar } from "semantic-ui-react";

import DownloadContent from "../../../Classes/DownloadContent/DownloadContent";

const download = new DownloadContent();

const axios = require("axios");

const AdminOrders = () => {
  const [searchByValue, setSearchByValue] = useState(3);
  const [apiResult, setApiResult] = useState([]);

  const [newStatusId, setNewStatusId] = useState(1);

  const [statusApiResult, setStatusApiResult] = useState([]);
  const [printlistcheckbox, setPrintlistcheckbox] = useState([]);

  const [pickupAddresses, setPickupAddresses] = useState([]);
  const [actualPickupAddressId, setActualPickupAddressId] = useState(0);

  const [myglsAccounts, setMyglsAccounts] = useState([]);
  const [actualMyglsAccountId, setActualMyglsAccountId] = useState(0);

  const [typeOfPrinter, setTypeOfPrinter] = useState("A4_2x2");
  const [printPosition, setPrintPosition] = useState(1);

  const [detailedSearchBarName, setDetailedSearchBarName] = useState("");
  const [detailedSearchBarOrderId, setDetailedSearchBarOrderId] = useState();
  const [detailedSearchBarZipCode, setDetailedSearchBarZipCode] = useState("");
  const [detailedSearchBarStatusId, setDetailedSearchBarStatusId] = useState(0);

  const [printActionDetails, setPrintActionDetails] = useState("");

  const [fake, setFake] = useState(true);

  const newStatusButtonStatus = newStatusId > 0 ? false : true;

  const forceRefresh = () => {
    setFake(!fake);
  };

  const checkboxValueHandler = (id) => {
    const indexOfTheTargetId = printlistcheckbox.indexOf(id);

    if (indexOfTheTargetId == -1) {
      setPrintlistcheckbox([...printlistcheckbox, id]);
      return true;
    } else {
      let temptyArray = [];

      printlistcheckbox.map((a) => (a == id ? "" : temptyArray.push(a)));

      setPrintlistcheckbox(temptyArray);
      return false;
    }
  };

  const checkStatus = (orderId) => {
    return printlistcheckbox.includes(orderId);
  };

  const selectAll = () => {
    let array = [];
    apiResult.map((a) => array.push(a.id));
    setPrintlistcheckbox(array);
  };

  const deSelectAll = (orderId) => {
    setPrintlistcheckbox([]);
  };

  const modifyStatus = () => {
    const updateStatusQuery = `mutation {updateOrderStatuses(orderIds:[${[...printlistcheckbox]}],newStatus:${newStatusId}){fieldCount}}`;

    axios(GraphQlConfig(updateStatusQuery))
      .then(function (response) {
        forceRefresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPickupAddresses = () => {
    const query = `{pickupAddress{id,Name,Country,ZipCode,City,Address,ContactName,Phone,Email,isDefault}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        const apiResponse = response.data.data.pickupAddress;

        setPickupAddresses(apiResponse);
        setActualPickupAddressId(apiResponse[0].id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMyglsAccounts = () => {
    //query taragets 1->Categories or 2->Brands

    const query = `{myglsAccount{id,email,clientNumber,country,typeOfPrinter,isDefault}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        setMyglsAccounts(response.data.data.myglsAccount);

        setTypeOfPrinter(response.data.data.myglsAccount[0].typeOfPrinter);

        setActualMyglsAccountId(response.data.data.myglsAccount[0].id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sendOrder = async () => {
    setPrintActionDetails("");
    try {
      const apiResponse = await BackendRESTrequest.post("/sendorders", {
        orderIds: printlistcheckbox,
        printOrientation: 1,
        typeOfPrinter: typeOfPrinter,
        printPosition: printPosition,
        selectedMyglsAccount: actualMyglsAccountId,
        actualPickupAddressId: actualPickupAddressId,
      });
      if (apiResponse.data.containsError == true) {
        alert("Some orders contains error. Please Check them in the log history Menu.");
      }

      setPrintActionDetails(apiResponse.data);
      forceRefresh();
    } catch (error) {
      () => alert(error);
    }
  };

  const sendExtraOrder = async (orderId, printOrientation) => {
    setPrintActionDetails("");
    try {
      const apiResponse = await BackendRESTrequest.post("/sendorders", {
        orderIds: [orderId],
        printOrientation: printOrientation,
        typeOfPrinter: typeOfPrinter,
        printPosition: printPosition,
        selectedMyglsAccount: actualMyglsAccountId,
        actualPickupAddressId: actualPickupAddressId,
      });

      setPrintActionDetails(apiResponse.data);

      if (apiResponse.data.containsError == true) {
        alert("Some orders contains error. Please Check them in the log history Menu.");
      }
    } catch (error) {
      () => alert(error);
    }
  };

  const getOrders = (detailedSearch = false) => {
    let queryExtender;

    detailedSearch == true
      ? (queryExtender = `status:${detailedSearchBarStatusId},name:"${detailedSearchBarName}",orderId:${
          detailedSearchBarOrderId ? detailedSearchBarOrderId : 0
        }, zipCode:"${detailedSearchBarZipCode}"`)
      : (queryExtender = `status:${searchByValue}`);
    const getOrdersQuery = `{orders(${queryExtender}){creationDate,LogHistory{orderId,successful,printactionId,printedLabels{parcelId,parcelnumber,printOrientation}printErrors{ErrorDescription,errorCode,orderId}},OrderFinalPrice,status,id,accountId,parcelCount,creationDate,status,statusDescription,ContactPerson{id,DeliveryName,Country,ZipCode,City,ZipCode,Address,Email,Phone,pclshopId} OrderItems{name,imgurl,category{name},count,netPrice,vat,finalPrice}}}    `;

    axios(GraphQlConfig(getOrdersQuery))
      .then(function (response) {
        setApiResult(response.data.data.orders);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getStatusEnumQuery = `{status{id,description}}`;

  const getOrderStatuses = () => {
    axios(GraphQlConfig(getStatusEnumQuery))
      .then(function (response) {
        setStatusApiResult(response.data.data.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPickupAddresses();
    getMyglsAccounts();
  }, []);

  useEffect(() => {
    getOrders();

    getOrderStatuses();
  }, [searchByValue, printlistcheckbox, fake]);

  const downloadPdf = () => {
    var config = {
      method: "get",
      url: `${apiEndpoint}/api/getlabels?type=pdf&loghistoryid=${printActionDetails.printActionId}`,
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

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginBottom: "1rem" }}>
        <div>
          <label>Mygls Account</label>
          <select
            name="searchBy"
            id="searchBy"
            style={{ width: "17rem" }}
            onChange={(e) => {
              setActualMyglsAccountId(e.target.value);
            }}
            value={actualMyglsAccountId}
          >
            {myglsAccounts.map((a) => {
              return <option value={a.id}>{a.email}</option>;
            })}
          </select>
        </div>
        <div>
          <label>PickUpAddress</label>
          <select
            name="searchBy"
            id="searchBy"
            style={{ width: "17rem" }}
            onChange={(e) => {
              setActualPickupAddressId(e.target.value);
            }}
            value={actualPickupAddressId}
          >
            {pickupAddresses.map((a) => {
              return <option value={a.id}>{a.Name}</option>;
            })}
          </select>
        </div>{" "}
        <div>
          <label>Type of printer</label>
          <select
            name="searchBy"
            id="searchBy"
            style={{ width: "17rem" }}
            onChange={(e) => {
              setTypeOfPrinter(e.target.value);
            }}
            value={typeOfPrinter}
          >
            <option value={"A4_2x2"}>A4_2x2</option>;<option value={"Connect"}>Connect</option>;<option value={"Thermo"}>Thermo</option>;
            <option value={"A4_4x1"}>A4_4x1</option>;
          </select>
          <br />
          <label>PrintPosition</label>
          <select
            name="searchBy"
            id="searchBy"
            style={{ width: "5rem" }}
            onChange={(e) => {
              setPrintPosition(e.target.value);
            }}
            value={printPosition}
          >
            <option value={1}>1</option>;<option value={2}>2</option>;<option value={3}>3</option>;<option value={4}>4</option>;
          </select>
        </div>
      </div>

      <div className="searchBar">
        <input type="number" value={detailedSearchBarOrderId} placeholder="OrderId" onChange={(e) => setDetailedSearchBarOrderId(e.target.value)} />
        <input placeholder="DeliveryName" value={detailedSearchBarName} onChange={(e) => setDetailedSearchBarName(e.target.value)} />
        <input placeholder="ZipCode" value={detailedSearchBarZipCode} onChange={(e) => setDetailedSearchBarZipCode(e.target.value)} />

        <select
          name="searchBy"
          id="searchBy"
          style={{ width: "17rem" }}
          onChange={(e) => {
            setDetailedSearchBarStatusId(e.target.value);
          }}
          value={detailedSearchBarStatusId}
        >
          <option value={0}>-- select an option -- </option>
          {statusApiResult.map((a) => {
            return <option value={a.id}>{a.description}</option>;
          })}{" "}
        </select>
        <button
          className="ui button"
          style={{ height: "4rem", fontSize: "15px", marginLeft: "1rem" }}
          onClick={(e) => {
            e.preventDefault();

            getOrders(true);
          }}
        >
          Search
        </button>
      </div>

      <label>Search by:</label>
      <select
        name="searchBy"
        id="searchBy"
        style={{ width: "17rem" }}
        onChange={(e) => {
          setPrintlistcheckbox([]);
          setSearchByValue(e.target.value);
        }}
        value={searchByValue}
      >
        {statusApiResult.map((a) => {
          return <option value={a.id}>{a.description}</option>;
        })}
      </select>
      <div class="ui relaxed divided list">
        {apiResult.map((a) => {
          return (
            <React.Fragment key={a.id}>
              <AdminOrderItem
                apiResultSrc={a}
                testFunction={checkboxValueHandler}
                checkStatus={checkStatus(a.id)}
                forceRefresh={forceRefresh}
                sendExtraOrder={sendExtraOrder}
              />
            </React.Fragment>
          );
        })}
      </div>
      <button
        class="ui button"
        onClick={() => {
          selectAll();
        }}
      >
        Select all
      </button>
      <button
        class="ui button"
        onClick={() => {
          deSelectAll();
        }}
      >
        DeSelect all
      </button>
      {searchByValue == 3 ? (
        <button
          class="ui button"
          onClick={() => {
            sendOrder();
          }}
        >
          Print selected
        </button>
      ) : (
        ""
      )}
      <div style={{ float: "right" }}>
        <label>Set Selected Orders new Status:</label>
        <select
          name="searchBy"
          id="searchBy"
          style={{ width: "17rem" }}
          onChange={(e) => {
            setNewStatusId(e.target.value);
          }}
          value={newStatusId}
        >
          {statusApiResult.map((a) => {
            return <option value={a.id}>{a.description}</option>;
          })}{" "}
        </select>
        <br />

        <button
          onClick={(e) => {
            e.preventDefault();
            modifyStatus();
          }}
          style={{ float: "right", marginTop: "1rem" }}
        >
          Save changes
        </button>
      </div>
      {printActionDetails.pdfCreated ? (
        <button
          className="ui button"
          style={{ fontSize: "24px", marginLeft: "1rem" }}
          onClick={(e) => {
            e.preventDefault();

            downloadPdf();
          }}
        >
          Download Labels <i class="fa fa-file-pdf-o"></i>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminOrders;
