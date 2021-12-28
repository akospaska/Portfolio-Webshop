class Formatter {
  finalPriceCalculator(priceReduce, netPrice, vat) {
    const isPriceReduced = priceReduce == 0 ? false : true;
    const priceReductionPercent = 1 - priceReduce / 100;
    const FinalPrice = !isPriceReduced
      ? (netPrice + (netPrice * vat) / 100).toFixed(2)
      : ((netPrice + (netPrice * vat) / 100) * priceReductionPercent).toFixed(2);

    return { finalPrice: FinalPrice };
  }
  timeConverter(UNIX_timestamp) {
    var a = new Date(Number(UNIX_timestamp));

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();

    var time = year + " " + month + " " + date;

    return time;
  }
  stringSplitter = (stringForSplit) => {
    const resultArray = stringForSplit.match(/\d+/);

    const splittedHouseNumber = resultArray[0];

    const splittedStreet = resultArray["input"].slice(0, resultArray["index"]);

    let houseNumberInfoStarterIndexNumber = Number(resultArray["index"]);

    switch (true) {
      case houseNumberInfoStarterIndexNumber <= 9:
        break;
      case houseNumberInfoStarterIndexNumber >= 10 && houseNumberInfoStarterIndexNumber <= 99:
        houseNumberInfoStarterIndexNumber = houseNumberInfoStarterIndexNumber + 1;
        break;
      case houseNumberInfoStarterIndexNumber >= 100:
        houseNumberInfoStarterIndexNumber = houseNumberInfoStarterIndexNumber + 2;
        break;
    }

    const splittedHouseNumberInfo = stringForSplit.slice(houseNumberInfoStarterIndexNumber + 1);

    return {
      Street: splittedStreet,
      HouseNumber: splittedHouseNumber,
      HouseNumberInfo: splittedHouseNumberInfo,
    };
  };
  inputValueSanitazer = (inputValue) => {
    let starter = inputValue.toLowerCase();
    starter = starter.replaceAll(/á|Â|ă|Ä|ä|â|Á/g, "a");
    starter = starter.replaceAll(/é|É|Ě|ě/g, "e");
    starter = starter.replaceAll(/Č|č|Ć|ć/g, "c");
    starter = starter.replaceAll(/Ĺ|ĺ|Ľ|ľ|ǉ|ǈ/g, "l");
    starter = starter.replaceAll(/Ț|Ť|ť|ț/g, "t");
    starter = starter.replaceAll(/Ŕ|ŕ|Ř|ř/g, "r");
    starter = starter.replaceAll(/Ș|ș|Š|š/g, "s");
    starter = starter.replaceAll(/Ď|ď|ǅ|đ|ǆ|Đ/g, "d");
    starter = starter.replaceAll(/Ň|ǋ|ǌ|ň/g, "n");
    starter = starter.replaceAll(/Ý|ý/g, "y");
    starter = starter.replaceAll(/í|Î|î|Í/g, "i");
    starter = starter.replaceAll(/Ž|ž/g, "z");
    starter = starter.replaceAll(/ó|Ó|Ó|ó|ö|Ö|ő|Ő|ô|Ô|õ|Õ/g, "o");
    starter = starter.replaceAll(/ú|Ú|ü|Ü|ű|Ű|Ů|ů|û|Û|ũ|Ũ/g, "u");
    starter = starter.replaceAll(/–|„|’|,|\.|-/g, "");

    return starter;
  };
  createHungarianDistrictSearchValue(zipCode) {
    if (zipCode.startsWith("1")) {
      let tempZip = zipCode;
      const district = Number(tempZip[1] + tempZip[2]);
      return ` ${district} kerulet`;
    }
  }
  orderListItem(resultArray, searchKeyword) {
    let finalArray = [];

    resultArray.map((a) => {
      this.inputValueSanitazer(a.zipcode) == searchKeyword || this.inputValueSanitazer(a.city) == searchKeyword ? finalArray.unshift(a) : finalArray.push(a);
    });
    return finalArray;
  }
  //Somehow the openingDays comes in unordered. This function makes in order
  orderOpeningDays(openingData) {
    let openingDays = openingData;
    let sourceObj = {
      0: "monday",
      1: "tuesday",
      2: "wednesday",
      3: "thursday",
      4: "friday",
      5: "saturday",
      6: "sunday",
    };

    let orderedOpeningDays = [];

    openingDays.map((a, b) => {
      orderedOpeningDays.push(openingDays.find((a) => a.day === sourceObj[b]));
    });
    return orderedOpeningDays;
  }
}

export default Formatter;
