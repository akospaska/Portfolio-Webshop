import axios from "axios";
import apiEndpoint from "../../../globalVariables/apiEndpint";

class DownloadContent {
  downloadLogFile(printactionId) {
    var config = {
      method: "get",
      url: `${apiEndpoint}/api/getlabels?type=logFile&loghistoryid=${printactionId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(response.data, null, 4)], {
          type: "text/plain;charset=utf-8",
        });
        element.href = URL.createObjectURL(file);
        element.download = `${printactionId}_report.txt`;
        document.body.appendChild(element);
        element.click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  downloadPdf(printactionId) {
    var config = {
      method: "get",
      url: `${apiEndpoint}/api/getlabels?type=pdf&loghistoryid=${printactionId}`,
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
  }
}

export default DownloadContent;
