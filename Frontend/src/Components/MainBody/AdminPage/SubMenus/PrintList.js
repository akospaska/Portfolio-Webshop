import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AdminOrderItem from './AdminOrderItem/AdminOrderItem';
import PrintListItem from './PrintListItem/PrintListItem';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {
  addChecboxItem,
  toggleCheckbox,
  clearCheckbox,
  selectAllCheckbox,
  deSelectAllCheckbox,
} from '../../../../actions';

var axios = require('axios');
const PrintList = () => {
  const [searchByValue, setSearchByValue] = useState(1);
  const [apiResult, setApiResult] = useState([]);
  const [printlistcheckbox, setPrintlistcheckbox] = useState([]);
  const [fake, setFake] = useState(!fake);
  const checkboxArray = useSelector((state) => state.printListCheckbox);
  const dispatch = useDispatch();
  const [pickupAddresses, setPickupAddresses] = useState([]);
  const [actualPickUpAddress, setActualPickupAddress] = useState(0);
  const [myglsAccounts, setMyglsAccounts] = useState([]);
  const [actualMyglsAccount, setActualMyglsAccount] = useState(0);
  const [printPosition, setPrintPosition] = useState(1);

  const getPrintList = () => {
    var data = JSON.stringify({
      filter: searchByValue,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8080/printlist/getordersbyprintlist',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setApiResult(response.data);

        //dispatch(clearCheckbox());
        if (checkboxArray.length == 0) {
          response.data.map((a) => {
            dispatch(addChecboxItem(a.orderId));

            // setPrintlistcheckbox([...printlistcheckbox, { orderId: a.orderId, isChecked: false }]);
          });
        }
      })
      .catch(function (error) {
        setApiResult([]);
      });
  };

  const getPickupAddresses = () => {
    var data = JSON.stringify({});

    var config = {
      method: 'post',
      url: 'http://localhost:8080/pickupaddress/getpickupaddresses',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setPickupAddresses(response.data);
        setActualPickupAddress(response.data[0].id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMyglsAccounts = () => {
    var data = JSON.stringify({});

    var config = {
      method: 'post',
      url: 'http://localhost:8080/myglsaccounts/getallmyglsaccounts',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setMyglsAccounts(response.data);
        setActualMyglsAccount(response.data[0].id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sendPrintListItemsToPrint = (arrayOfOrderIds, parcelOrientation = 1) => {
    var data = JSON.stringify({
      orderIdList: arrayOfOrderIds,
      pickupAddressId: actualPickUpAddress,
      myglsAccountId: actualMyglsAccount,
      printPosition: printPosition,
      parcelOrientation: parcelOrientation,
    });

    var config = {
      method: 'post',
      responseType: 'blob',
      url: 'http://localhost:8080/printlabels/printlabels',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log('facking macking');
    console.log(data);
    axios(config)
      .then(function (response) {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: 'application/pdf' });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkIsItValid = (orderId) => {
    try {
      return checkboxArray.find((a) => a.orderId === orderId).isChecked;
    } catch (error) {
      return false;
    }
  };

  const isItA4 = () => {
    let selectedMyglsAccount = myglsAccounts.find((a) => a.id === actualMyglsAccount);

    try {
      let isItA4 = selectedMyglsAccount.typeOfPrinter === 'A4_2x2';
      return isItA4;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    getPrintList();
    getPickupAddresses();
    getMyglsAccounts();
  }, [searchByValue, fake]);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Search by:</label>
      <select
        name="searchBy"
        id="searchBy"
        style={{ width: '17rem' }}
        onChange={(e) => {
          setSearchByValue(e.target.value);
          dispatch(deSelectAllCheckbox());
        }}
      >
        <option value={1}>beforePrint</option>
        <option value={2}>issueDuringPrint</option>
        <option value={3}>printed</option>
      </select>

      <br />
      <label>Mygls user:</label>
      <select
        name="searchBy"
        id="searchBy"
        style={{ width: '19rem', marginTop: '1rem' }}
        onChange={(e) => setActualMyglsAccount(e.target.value)}
      >
        {myglsAccounts.map((a) => (
          <option value={a.id}>{a.Email}</option>
        ))}
      </select>
      <br />
      <label>Pickup Address:</label>
      <select
        name="searchBy"
        id="searchBy"
        style={{ width: '17rem', marginTop: '1rem' }}
        onChange={(e) => setActualPickupAddress(e.target.value)}
      >
        {pickupAddresses.map((a) => {
          return <option value={a.id}>{a.Name}</option>;
        })}
      </select>
      <br />
      {isItA4() ? (
        <div>
          <label>Print Position:</label>
          <select
            style={{ width: '5rem', marginTop: '1rem' }}
            onChange={(e) => setPrintPosition(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
      ) : (
        ''
      )}

      <div class="ui relaxed divided list">
        {apiResult.map((a) => {
          console.log('i am looping');
          return (
            <div style={{ marginBottom: '1rem' }}>
              <input
                onChange={(e) => {
                  let findIndex = checkboxArray.find(
                    (element) => element.orderId == a.orderId
                  ).orderId;

                  dispatch(toggleCheckbox(findIndex));
                  setFake(!fake);
                  /*      let searchArray = printlistcheckbox.find(
                    (element) => (element.orderId = a.orderId)
                  ); */
                }}
                type="checkbox"
                // checked={checkIsItValid(a.orderId)}
                checked={checkIsItValid(a.orderId)}
                style={{ float: 'left', marginLeft: '6rem', height: '7rem' }}
              />
              <PrintListItem
                apiResultSrc={a}
                printListType={searchByValue}
                printLabel={sendPrintListItemsToPrint}
              />
            </div>
          );
        })}
      </div>
      <button
        class="ui button"
        onClick={() => {
          dispatch(selectAllCheckbox());

          setFake(!fake);
        }}
      >
        Select all
      </button>
      {/*   <button
        class="ui button"
        onClick={() => {
          dispatch(deSelectAllCheckbox());
          console.log(checkboxArray);
        }}
      >
        Remove all select
      </button> */}
      <button
        class="ui button"
        onClick={() => {
          dispatch(deSelectAllCheckbox());
          setFake(!fake);
        }}
      >
        Deselect all
      </button>
      <button
        class="ui button"
        onClick={() => {
          console.log(checkboxArray);
          let emptyArray = [];
          checkboxArray.map((a) => {
            if (a.isChecked == true) {
              emptyArray.push(a.orderId);
            }
          });
          console.log('actualMygls account');

          console.log('actual pickup address');
          console.log(actualPickUpAddress);
          console.log(actualMyglsAccount);
          console.log(printPosition);
          sendPrintListItemsToPrint(emptyArray);
        }}
      >
        Print Selected items
      </button>
    </div>
  );
};

export default PrintList;
