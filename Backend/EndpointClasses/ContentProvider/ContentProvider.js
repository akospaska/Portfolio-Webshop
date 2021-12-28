const LabelCreation = require("../../Classes/GLS/LabelCreation/LabelCreation");
const Logging = require("../../Classes/Logging/Logging");

const labelCreation = new LabelCreation();
const logging = new Logging();

class ContentProvider {
  async sendPDFLabel(req, res) {
    const loghistoryid = req.query.loghistoryid;

    //get labelsData
    const labelsArray = await logging.getLabelsFromMongoDb(loghistoryid);

    //generate and delete later the pdf

    const tempPDFId = await labelCreation.createTempPDF2(labelsArray, loghistoryid);

    //send the created pdf

    await labelCreation.sendCreatedLabel(req, res, tempPDFId);

    //delete the pdf

    await labelCreation.removeCreatedLabel(tempPDFId);
  }
  async sendLogFile(req, res) {
    const loghistoryid = req.query?.loghistoryid;

    //get labelsData

    const logFile = await logging.getLogHistoryData(loghistoryid);

    console.log(logFile);

    res.send(logFile);
  }
}
module.exports = ContentProvider;
