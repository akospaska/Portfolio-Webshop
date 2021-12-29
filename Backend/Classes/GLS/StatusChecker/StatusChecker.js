const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");
const GetParcelStatusesRequest = require("../GetParcelStatusesRequest/GetParcelStatusesRequest");
const Order = require("../../Order/Order");

const order = new Order();

class StatusChecker extends GetParcelStatusesRequest {
  async checkOpenedOrdersStatuses() {
    //1. Get all of the parcelnumbers with not delivered status
    const collectedParcelNumbers = await MyslqDatabaseConnection.await(
      `select pl.parcelnumber,pl.createdBy,o.status, o.id from printedlabels pl join \`order\` o on o.id = pl.orderId where o.status in (5,6)`
    );

    //2. get all mygls account's details
    const collectedMyglsAccounts = await MyslqDatabaseConnection.await(`select * from myglsaccount`);
    //iterate over the parcelnumbers and set the exact statuses
    collectedParcelNumbers.map(async (a) => {
      //Get the MyGLS account details what belongs to the parcelnumber
      const selectedMyglsAccount = collectedMyglsAccounts.find((myglsAccount) => a.createdBy == myglsAccount.id);

      const { email, password } = selectedMyglsAccount;

      //Get the request body for the status checker
      const requestBody = this.GetPArcelStatusesRequestBodyBuilder(email, password, a.parcelnumber);

      //Get the actual parcel status of the parcelnumber Via API
      const apiResponse = await GLSAPI.post("GetParcelStatuses", requestBody);

      //Declare the statusList
      const { ParcelStatusList } = apiResponse;

      //Create a statusHistory Array, what belongs all of the status codes
      let statusHistory = [];
      ParcelStatusList.map((statusEvent) => {
        statusHistory.push(statusEvent.StatusCode);
      });

      //Decide what order status the order actual have -- Example: On delivery, Delivered, Back to the sender
      await this.statusDecider(statusHistory, a.id);
    });
  }
  async statusDecider(statusHistory, orderId) {
    //includes 23 =>back send to the sender
    if (statusHistory.includes("23")) {
      const setNewStatusResult = await order.setOrderStatusByIdArray([orderId], 8);
      return;
    }

    //inculeds 05 => delivered
    if (statusHistory.includes("05")) {
      const setNewStatusResult = await order.setOrderStatusByIdArray([orderId], 7);
      return;
    }

    //includes 01 => On delivery
    if (statusHistory.includes("01")) {
      const setNewStatusResult = await order.setOrderStatusByIdArray([orderId], 6);
      return;
    }
  }
}

module.exports = StatusChecker;
nyom;
