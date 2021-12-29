const Cryption = require("../../Authentication/Cryption");

const cryption = new Cryption();

class GetParcelStatusesRequest {
  GetPArcelStatusesRequestBodyBuilder(myglsAccountName, myglsPassword, parcelNumber) {
    return {
      Password: cryption.hashedPasswordToByteArray(myglsPassword),
      Username: myglsAccountName,
      LanguageIsoCode: "hu",
      ReturnPOD: false,
      ParcelNumber: parcelNumber,
    };
  }
}

module.exports = GetParcelStatusesRequest;
