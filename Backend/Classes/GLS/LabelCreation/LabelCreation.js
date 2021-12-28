const fs = require("fs");

const path = require("path");

class LabelCreation {
  #responseDecoder(ascii) {
    return String.fromCharCode(ascii);
  }
  async createPDF(response, newPrintActionId) {
    let actualTimeStamp = newPrintActionId;
    let tempArray = [];
    response.map((a) => {
      let indexValue = this.#responseDecoder(a);
      tempArray.push(indexValue);
    });

    let finalPdfSrc = tempArray.join("");

    await fs.writeFileSync(`./src/CreatedLabels/${actualTimeStamp}.pdf`, finalPdfSrc, "binary");

    let generatedPdfLabel = await path.join(__dirname, `../../src/createdLabels/${actualTimeStamp}.pdf`);

    await fs.access(generatedPdfLabel, fs.constants.F_OK, (err) => {});
    return actualTimeStamp;
  }

  async createTempPDF2(labelArray, printActionId) {
    let actualTimeStamp = Date.now();
    let tempArray = [];
    labelArray.map((a) => {
      let indexValue = this.#responseDecoder(a);
      tempArray.push(indexValue);
    });

    let finalPdfSrc = tempArray.join("");

    await fs.writeFileSync(`./src/LabelsTemp/${actualTimeStamp}.pdf`, finalPdfSrc, "binary");

    let generatedPdfLabel = await path.join(__dirname, `../../../src/createdLabels/${actualTimeStamp}.pdf`);

    await fs.access(generatedPdfLabel, fs.constants.F_OK, (err) => {});
    return actualTimeStamp;
  }

  async createTempPDF(response, printActionId) {
    let actualTimeStamp = Date.now();
    let tempArray = [];
    response.map((a) => {
      let indexValue = this.#responseDecoder(a);
      tempArray.push(indexValue);
    });

    let finalPdfSrc = tempArray.join("");

    await fs.writeFileSync(`./src/CreatedLabels/${actualTimeStamp}.pdf`, finalPdfSrc, "binary");

    let generatedPdfLabel = await path.join(__dirname, `../../src/LabelsTemp/${printActionId}.pdf`);

    await fs.access(generatedPdfLabel, fs.constants.F_OK, (err) => {});
    return actualTimeStamp;
  }

  async sendCreatedLabel(req, res, loghistoryId) {
    let generatedPdfLabel = path.join(__dirname, `../../../src/LabelsTemp/${loghistoryId}.pdf`);
    console.log(generatedPdfLabel);

    fs.access(generatedPdfLabel, fs.constants.F_OK, async (err) => {
      //check that we can access  the file
      console.log(`${generatedPdfLabel} ${err ? "does not exist" : "exists"}`);
    });

    fs.readFile(generatedPdfLabel, async function (err, content) {
      if (err) {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end("<h1>No such image</h1>");
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200, { "Content-type": "application/pdf" });

        res.end(content);

        return await content;
      }
    });
  }
  async removeCreatedLabel(loghistoryId) {
    const targetFolder = path.join(__dirname, `../../../src/LabelsTemp`);
    fs.readdir(targetFolder, async (err, files) => {
      if (err) throw err;

      for (const file of files) {
        return await fs.unlink(path.join(targetFolder, file), async (err) => {
          if (err) throw err;
        });
      }
    });
  }
}

module.exports = LabelCreation;
