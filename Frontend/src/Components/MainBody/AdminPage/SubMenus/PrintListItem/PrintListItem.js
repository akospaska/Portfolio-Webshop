import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
var axios = require('axios');

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();

  var time = year + ' ' + month + ' ' + date;

  return time;
}

const PrintListItem = (props) => {
  const [displayStatus, setDisplayStatus] = useState(false);
  const [detailedOrderListItem, setDetailedOrderListItem] = useState([]);
  let displayStatusStyle = displayStatus ? {} : { display: 'none' };

  const [x, setX] = useState(props.Address);

  const [fake, setFake] = useState(true);

  const {
    /*  Address,
    DeliveryName,
    City,
    Country,
    Email,
    Phone,
    ZipCode,
    accountId,
    confirmed,

    done, */
    contactPersonId,
    orderId,
    creationDate,
  } = props.apiResultSrc;

  console.log(props);

  const getContactPerson = () => {
    var data = JSON.stringify({
      orderId: orderId,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8080/order/getContactPersonByOrderId',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        response.data[0];

        setName(response.data[0].Name);
        setCountry(response.data[0].CountryIsoCode);
        setZipCode(response.data[0].ZipCode);
        setCity(response.data[0].city);
        setAddress(response.data[0].Street);
        setPhone(response.data[0].ContactPhone);
        setEmail(response.data[0].ContactEmail);

        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getContactPerson();
  }, [fake]);

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [count, setCount] = useState(1);
  const [printStatus, setPrintStatus] = useState('');
  const [printlistId, setPrintlistId] = useState(0);
  const [errorDescription, setErrorDescription] = useState([]);
  const [parcelNumbers, setParcelNumbers] = useState([]);

  const printListType = props.printListType;
  console.log('THAT IS PRINTLIST TYPE');

  let hideButtons =
    printListType == 3
      ? { display: 'none', marginLeft: '10px' }
      : { marginLeft: '10px', marginRight: '5px' };

  console.log(hideButtons);
  console.log(printListType);
  const getDetailedList = () => {
    var data = JSON.stringify({
      orderId: orderId,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8080/order/getorderid',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setDetailedOrderListItem(response.data);
      })
      .catch(function (error) {});
  };

  const getPrintListDetail = () => {
    var data = JSON.stringify({
      id: orderId,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8080/printlist/getprintlist',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setCount(response.data[0].count);
        setPrintlistId(response.data[0].id);
        setPrintStatus(response.data[0].lastStatusMessage);
      })
      .catch(function (error) {});
  };

  const modifyCount = (direction) => {
    var data = JSON.stringify({
      id: printlistId,
      direction: direction,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8080/printlist/modifyprintlistcount',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setFake(!fake);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const isItWithIssue = '';

  const getPrintErrorData = () => {
    var data = JSON.stringify({
      orderId: orderId,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8080/printlist/geterrorlistbyorder',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setErrorDescription(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getParcelNumbers = () => {
    var data = JSON.stringify({
      orderId: orderId,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8080/order/getParcelNumbers',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setParcelNumbers(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateContactPerson = () => {
    const jsonData = {
      contactPersonId: contactPersonId,
      Name: name,
      CountryIsoCode: country,
      ZipCode: zipCode,
      Street: address,
      ContactName: name,
      ContactPhone: phone,
      ContactEmail: email,
    };
    //

    var data = JSON.stringify(jsonData);

    var config = {
      method: 'post',
      url: 'http://localhost:8080/order/updatecontactpersonbyorderid',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setFake(!fake);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPrintErrorData();
    getParcelNumbers();
  }, [fake]);
  const calculateSummary = () => {
    let actualPrice = 0;
    detailedOrderListItem.map((a) => {
      actualPrice = actualPrice + a.count * a.price;
    });
    return actualPrice;
  };
  getPrintListDetail();

  let borderOfPrintListItem = '';
  if (printListType == 2) {
    borderOfPrintListItem = '3px solid rgb(255 0 0)';
  }
  if (printListType == 1) {
    borderOfPrintListItem = '1px solid #aeaeae';
  }

  if (printListType == 3) {
    borderOfPrintListItem = '3px solid rgb(30 174 0)';
  }

  const reprintButtonHider =
    printListType == 3 ? { float: 'left' } : { float: 'left', display: 'none' };

  const parcelNumbersStyle =
    printListType == 3
      ? { float: 'right', marginTop: '-3rem' }
      : { float: 'right', marginTop: '-3rem', display: 'none' };

  return (
    <div class="item" style={{ width: '66rem' }}>
      <div
        class="content"
        style={{
          border: borderOfPrintListItem,
          width: '66rem',
          borderRadius: '0.625rem',
          padding: '1rem',
          boxShadow: '0 5px 10px 0 rgb(0 0 0 / 15%)',
        }}
      >
        <button
          style={{ float: 'right' }}
          class="ui button"
          onClick={() => {
            setDisplayStatus(!displayStatus);
          }}
        >
          See Details
        </button>
        <a class="header">OrderId:{orderId}</a>
        <div class="description">{name}</div>
        <div class="description">Date:{timeConverter(creationDate.seconds)}</div>
        <div style={displayStatusStyle}>
          <div class="ui grid">
            <div class="four wide column" style={{ fontSize: '1.5rem', width: '25px !important' }}>
              {' '}
              <div class="ui list" style={{ width: '40rem' }}>
                <div class="item">Delivery Name:</div>
                <div class="item">Country:</div>
                <div class="item">ZipCode:</div>
                <div class="item">Address:</div>
                <div class="item">Phone:</div>
                <div class="item">Email:</div>
              </div>
            </div>
            <div
              class="four wide column"
              style={{
                float: 'right',
                width: '136px !important',
                fontSize: '1.5rem',
                marginRight: '31rem',
              }}
            >
              {' '}
              <div></div>
              <div class="ui list" style={{ width: '40rem' }}>
                <input value={name} class="item" onChange={(e) => setName(e.target.value)} />
                <input value={country} class="item" onChange={(e) => setCountry(e.target.value)} />

                <input value={zipCode} class="item" onChange={(e) => setZipCode(e.target.value)} />
                <input value={address} class="item" onChange={(e) => setAddress(e.target.value)} />
                <input value={phone} class="item" onChange={(e) => setPhone(e.target.value)} />
                <input value={email} class="item" onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
          </div>

          <div class="ui list">
            {detailedOrderListItem.map((a) => {
              return (
                <div class="item">
                  {a.name} {a.count}x {a.price} Eur
                </div>
              );
            })}

            <div style={{ fontWeight: 'Bold' }} class="item">
              {/*         Summary: {calculateSummary()} Eur */}
            </div>
            <button onClick={(e) => updateContactPerson()} class="ui button">
              Update Contact Person
            </button>
          </div>
          <br />
        </div>
        <div className="countContainer" style={{ float: 'left' }}>
          Label Count:
          <button style={hideButtons} onClick={() => modifyCount('-')}>
            -
          </button>
          {count}
          <button style={hideButtons} onClick={() => modifyCount('+')}>
            +
          </button>
        </div>
        <br />
        <div style={reprintButtonHider} className="countContainer">
          <button onClick={() => props.printLabel([orderId], 2)}>Reprint</button>
        </div>
        <div style={{ float: 'right', marginTop: '-3rem' }}>PrintStatus: {printStatus}</div>
        <br />

        <div style={parcelNumbersStyle}>
          {' '}
          Parcelnumbers
          <ul>
            {parcelNumbers.map((a, b) => (
              <li>{`${b + 1}:${a.parcelNumbers} Origin:${
                a.parcelOrientation == 1 ? 'Original' : 'Reprinted'
              }`}</li>
            ))}
          </ul>
        </div>
        <br />
        {printListType == 2
          ? errorDescription.length == 0
            ? ''
            : errorDescription.map((a) => {
                console.log(a);
                return (
                  <div style={{ marginTop: '1rem' }}>
                    <div>Error Code: {a.errorCode}</div>
                    <div>Error Description: {a.errorDescription}</div>
                  </div>
                );
              })
          : ''}
      </div>
    </div>
  );
};

export default PrintListItem;
