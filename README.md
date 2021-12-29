# About the project

<p float="left">
<img src="https://referenceprojects-abkno.run-eu-central1.goorm.io/src/github/referencewebshop/react-2.svg" height="50px">
<img src="https://referenceprojects-abkno.run-eu-central1.goorm.io/src/github/referencewebshop/redux.svg" height="50px">
<img src="https://referenceprojects-abkno.run-eu-central1.goorm.io/src/github/referencewebshop/nodejs-icon.svg" height="50px">
<img src="https://referenceprojects-abkno.run-eu-central1.goorm.io/src/github/referencewebshop/graphql.svg" height="50px">
<img src="https://referenceprojects-abkno.run-eu-central1.goorm.io/src/github/referencewebshop/mysql-6.svg" height="50px">
<img src="https://referenceprojects-abkno.run-eu-central1.goorm.io/src/github/referencewebshop/mongodb-icon-1.svg" height="50px">
<img src="https://referenceprojects-abkno.run-eu-central1.goorm.io/src/github/referencewebshop/stripe-4.svg" height="30px">
<img src="https://mygls.hu/Content/Images/logo-inverse.png" height="30px">
</p>



### Backend & Admin user Focused **Webshop** with GLS General Logistic System **Parcel label printing** and Stripe integration.

Note that, this porject is an **MVP**.

The project is focused on the **Backend** technologies and problem solving.

### Live Demo: https://referenceprojects-abkno.run-eu-central1.goorm.io/

Customer's credential:

- You can create your own via the Sing Up page.

Admin Demo user's credential:

- Username: admin
- Password: admin

Note that, the admin demo user didn't have access to delete or modify the following items:

- Product
- Category
- Brand
- Admin Account
- Mygls Account

## Used Stacks.

- Frontend:
  - ReactJS
  - Redux
- Backend:

  - NodeJS
  - Rest API + **GraphQL**

  - MailJet

- Databases:
  - MySQL
  - MongoDB

# Features:

## **Customer:**

---

### As a Customer without registration:

- Buy products without registration (How i prefer to buy in a webshop)
- If the product is not paid via Stripe, then an order confirmation e-mail will be sent.

### As a Customer with registration:

- If the customer is not signed in, but the shopping cart already contains items, then the shopping cart items will be set to the registered account, if the customer is sign in.

- Set a default delivery address, which will be automatically displayed in the checkout screen.

- Check and track the orders statuses, what belongs to the account ID.

### Overall as a customer

- The customer can register and create an account. (Works with the live demo too.)

- The Customer can set the delivery address at home, or to a selected ParcelShop. The parcelshop lists and theirs unique ID are come from the official GLS API.

- The customer can choose between three different payment methods:

  - Bank Transfer
  - Cash on Demand
  - **Stripe**

## **Admin user:**

---

### **Handle orders**

- Search between the orders by the following parameters:

- OrderID

  - Customer's Name
  - Customer's ZipCode
  - Order status

- Set order's statuses in a single or in Bulk way.

## **Print ParcelLabels via the GLS API.**
<img src="https://online.gls-hungary.com/img/postive_logo.png#gh-light-mode-only" height="30px">


The GLS Label Printing runs on the test environment, that's why there is no barcode on the labels.

![Alt Text](https://referenceprojects-abkno.run-eu-central1.goorm.io/src/github/referencewebshop/printing.gif)

Implemented GLS API Features

- Set the necessary ParcelCount by the label generating
- Choose between the registered MyGLS Accounts
- Choose the Type of printer and the label position
- Send **Pick and Ship** request
- Print **Exchange Service** Parcel labels
- **Reprint** the parcelLabel with the SAME parcelnumber
- Get the Formatted log file of the order
- See the error description if the label printing was not success.
- Get the parcelnumbers if the printing was success.
- Track order
- Delete order
- Modify the shipping details:
  - Name
  - Address
  - Email
  - Etc.



- **Automata** order status controller

  - **Every hour** a cronJob get the opened order's status based on the printed ParcelNumbers
  - Based on the API result the order status could be changed to:
    - OnDelivery
    - Delivered
    - BackToTheSender

### **Product Manager**

- The product's price has five different parameters:

  - Net Price
  - Vat
  - Unique item discount
  - Discount by the category
  - Discount by the brand

- Register new products
  -Image maximum size has been set to 50 MB.

- Search between the products by the following parameters:

- Product Name

  - Category
  - Brand
  - Name

- Modify the product's detail:

  - Net Price
  - Vat
  - Discount %
  - Name
  - Is it featured or not. (The featured items are displayed on the home screen)

- Delete the product (Note that, the product will not be deleted. It will be set the "isDeleted" value to 1 in the database)

### **Category & Brand Manager**

- Register new Brand or Category

- Modify the Category or the Brand details:
- Name
- Discount %

- Delete the Category or the Brand
  - If the Category or the Brand is deleted, then all the products what belongs to them will be also deleted

### **Pickup Addresses**

- The admin user can create or modify the pickup addresses
  - Can set the default pickup address by the label printing

### **Mygls settings**

The GLS label printing integration works with MyGLS accounts

- The user can register new Mygls Accounts
- Modify registered Mygls Accounts
- Choose default Parcel Services
- Set default Mygls Account

### **Admin Accounts**

- Create new Admin accounts

- Set inactive, or delete admin accounts

### **Print History**

- By default the last 20 log file have displayed

- Search between the log files based on the order id

- The log files are stored in a **MongoDB**

- The logFiles contains the following data:
  - Timestamp
  - PrintLabel's request body
  - PrintLabel's response body
  - The parcel labels in byte array
  - Request's endpoint

---

The main page was inspired by a html template. All the other pages (Admin pages, orders Etc..) were made by Myself.
https://themehunt.com/item/1524993-eshopper-free-ecommerce-html-template
