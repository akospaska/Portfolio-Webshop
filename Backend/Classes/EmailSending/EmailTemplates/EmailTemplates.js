const EmailSending = require("../EmailSending/EmailSending");
const getAccountVerificationTemplate = require("../../../src/exportEmailTemplates/AccountVerificationEmail/GetAccountVerificationTemplate");
const GetOrderConfirmationTemplate = require("../../../src/exportEmailTemplates/GetOrderConfirmationTemplate");
const getOrderSummaryTemplate = require("../../../src/exportEmailTemplates/OrderSummary/OrderSummary");
const GetOrderDispatchedEmailTemplate = require("../../../src/exportEmailTemplates/OrderDispatchedEmail/GetOrderDispatched");

class EmailTemplates extends EmailSending {
  constructor() {
    super();
  }
  sendAccountVerificationTemplate(toEmailAddress, sessionKey) {
    const sendEmail = this.sendEmail(toEmailAddress, `Account verification`, getAccountVerificationTemplate(sessionKey));

    return sendEmail;
  }

  sendOrderVerificationEmailTemplate(toEmailAddress, sessionKey, orderItems, name, orderId) {
    const sendEmail = this.sendEmail(toEmailAddress, `Order Confirmation`, GetOrderConfirmationTemplate(orderItems, name, sessionKey, orderId));

    return sendEmail;
  }

  sendOrderSummaryEmailTemplate(toEmailAddress, orderItems, name) {
    const sendEmail = this.sendEmail(toEmailAddress, `Order Summary`, getOrderSummaryTemplate(orderItems, name));

    return sendEmail;
  }

  sendOrderDispatchedEmailTemplate(toEmailAddress, orderItems, name, summaryPrice, parcelNumber) {
    const sendEmail = this.sendEmail(
      toEmailAddress,
      `Your order has been dispatched!`,
      GetOrderDispatchedEmailTemplate(orderItems, name, summaryPrice, parcelNumber)
    );

    return sendEmail;
  }
}

module.exports = EmailTemplates;
