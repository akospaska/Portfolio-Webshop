const MongoClient = require("mongodb").MongoClient;

const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");

class Logging {
  createLogBody(request, response, method, pdfGenerated, timestamp, endpoint) {
    let resp = response;

    const logHistory = {
      actionId: timestamp,
      request: request,
      response: response, // `${JSON.stringify(response, null, 4)}\n\n`,
      method: method,
      pdfGenerated: pdfGenerated,
      dateTime: timestamp, // new Date(),
      endpoin: endpoint,
    };

    return logHistory;
  }

  async insertLogFileToMongoDB(request, response, method, pdfGenerated, timestamp, endpoint) {
    const logFile = this.createLogBody(request, response, method, pdfGenerated, timestamp, endpoint);

    const client = await MongoClient.connect(`mongodb+srv://secret key?retryWrites=true&w=majority`);

    const db = client.db();

    const insertResult = await db.collection("logHistory").insertOne(logFile);

    client.close();
  }

  async truncateCollection() {
    const client = await MongoClient.connect(`mongodb+srv://secret key?retryWrites=true&w=majority`);

    const db = client.db();

    const truncate = await db.collection("logHistory").drop(function (err, delOK) {
      if (err) throw err;
      if (delOK) console.log("Collection deleted");
    });

    return true;
  }

  async getLabelsFromMongoDb(actionId) {
    const client = await MongoClient.connect(`mongodb+srv://secret key?retryWrites=true&w=majority`);

    const db = client.db();

    const something = await db
      .collection("logHistory")
      .find({ actionId: Number(actionId) })
      .toArray();

    client.close();

    return await something[0].response.Labels;
  }

  async getLogHistoryData(actionId) {
    console.log("the resquest has been sent");
    const client = await MongoClient.connect(`mongodb+srv://secret key?retryWrites=true&w=majority`);

    const db = client.db();

    console.log(`The request has been sent with: ${actionId}`);

    let apiResponse = await db
      .collection("logHistory")
      .find({ actionId: Number(actionId) })
      .toArray();

    apiResponse[0].request.Password = ["Encrypted"];
    apiResponse[0].response.Labels = ["The labels in byte array"];

    client.close();

    return await apiResponse;
  }

  async insertLoghistoryToMysqlDB(orderIdArray, newPrintActionId, successful) {
    orderIdArray.map(async (a) => {
      const insertNewRecords = await MyslqDatabaseConnection.awaitQuery(
        `insert into loghistory (printactionId,orderId,successful) values(${newPrintActionId},${a},${successful})`
      );
    });
  }

  async insertPrintErrorList(orderIdWithError, ErrorDescription, ErrorCode) {
    await this.deletePrintErrorList(orderIdWithError);
    const insertResult = await MyslqDatabaseConnection.awaitQuery(
      `insert into printerrorlist (orderId,ErrorDescription,errorCode) values(${orderIdWithError},"${ErrorDescription}",${ErrorCode})`
    );
  }

  async deletePrintErrorList(orderIdWithError) {
    const deleteResult = await MyslqDatabaseConnection.awaitQuery(`delete from printerrorlist where orderId=${orderIdWithError} `);
  }
  async insertParcelNumbersList(ParcelNumber, ParcelId, printedOrderId, printOrientation, myGLSAccountId) {
    await MyslqDatabaseConnection.awaitQuery(
      `insert into printedlabels (parcelNumber,parcelId,orderId,printorientation,createdBy) values(${ParcelNumber},${ParcelId},${printedOrderId}, ${printOrientation},${myGLSAccountId})`
    );
  }
  async setOrderStatus(orderIdArray, status) {
    await MyslqDatabaseConnection.awaitQuery(`update \`order\` set status = ${status} where id in (${[...orderIdArray]})`);
  }
}

module.exports = Logging;
