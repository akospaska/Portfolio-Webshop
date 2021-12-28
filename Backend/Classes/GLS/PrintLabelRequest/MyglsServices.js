class MyglsServices {
  getServiceBody(serviceId, email, phone, pclshopId) {
    switch (serviceId) {
      case 1:
        return this.FdsBody(email);
        break;
      case 2:
        return this.FssBody(phone);
        break;
      case 3:
        return this.SM2Body(phone);
        break;
      case 4:
        return this.CS1Body(phone);
        break;
      case 5:
        return this.PRSBody();
        break;
      case 6:
        return this.XSBody();
        break;
      case 7:
        return this.PSDBody(pclshopId);
        break;

      default:
      // code block
    }
  }

  FdsBody(email) {
    const serviceId = 1;
    return {
      Code: "FDS",
      FDSParameter: {
        Value: email,
      },
    };
  }

  FssBody(contactPhone) {
    const serviceId = 2;
    return {
      Code: "FSS",
      FSSParameter: {
        Value: contactPhone,
      },
    };
  }
  SM2Body(contactPhone) {
    const serviceId = 3;
    return {
      Code: "SM2",
      SM2Parameter: {
        Value: contactPhone,
      },
    };
  }
  CS1Body(contactPhone) {
    const serviceId = 4;
    return {
      Code: "CS1",
      CS1Parameter: {
        Value: contactPhone,
      },
    };
  }
  PRSBody() {
    const serviceId = 5;
    return {
      Code: "PRS",
    };
  }
  XSBody() {
    const serviceId = 6;
    return {
      Code: "XS",
    };
  }
  PSDBody(pclshopId) {
    const serviceId = 7;
    return {
      Code: "PSD",
      PSDParameter: {
        StringValue: pclshopId,
      },
    };
  }
}

module.exports = MyglsServices;
