
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `accountDetailId` int DEFAULT NULL,
  `groupId` int NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isActive` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) 

CREATE TABLE `accountcreationrequest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accountCreationRequestSessionKey` varchar(250) NOT NULL,
  `email` char(250) NOT NULL,
  `password` char(250) NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `groupId` int DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) 

CREATE TABLE `accountdetail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accountId` int NOT NULL,
  `deliveryName` char(250) NOT NULL,
  `deliveryCountry` char(2) NOT NULL,
  `deliveryZipCode` char(50) NOT NULL,
  `deliveryCity` char(250) NOT NULL,
  `deliveryStreet` char(250) NOT NULL,
  `deliveryContactEmail` char(250) NOT NULL,
  `deliveryContactPhone` char(250) NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `backendsecretkey` (
  `backendSecretKey` varchar(250) NOT NULL
) 

CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(250) NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `priceReduce` float DEFAULT '0',
  PRIMARY KEY (`id`)
) 

CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(250) NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `priceReduce` float DEFAULT '0',
  PRIMARY KEY (`id`)
) 

CREATE TABLE `contactperson` (
  `id` int NOT NULL AUTO_INCREMENT,
  `DeliveryName` varchar(250) NOT NULL,
  `Country` varchar(2) NOT NULL,
  `City` varchar(250) DEFAULT NULL,
  `ZipCode` varchar(250) DEFAULT NULL,
  `Address` varchar(250) DEFAULT NULL,
  `Email` varchar(250) DEFAULT NULL,
  `Phone` varchar(250) DEFAULT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `pclshopId` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `defaultmyglsservices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceId` int NOT NULL,
  `myglsAccountId` int NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `loghistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `printactionId` mediumtext NOT NULL,
  `orderId` int NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `successful` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) 

CREATE TABLE `myglsaccount` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `clientNumber` int NOT NULL,
  `country` varchar(2) NOT NULL,
  `typeOfPrinter` varchar(50) DEFAULT NULL,
  `isDefault` tinyint NOT NULL DEFAULT '0',
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `myglsservice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(10) NOT NULL,
  `description` varchar(250) NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderRequestConfirmationtSessionKey` varchar(250) DEFAULT NULL,
  `accountId` int DEFAULT '0',
  `confirmed` tinyint NOT NULL DEFAULT '0',
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `contactPersonId` int NOT NULL,
  `done` tinyint NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '1',
  `parcelCount` int DEFAULT '1',
  `payed` tinyint NOT NULL DEFAULT '0',
  `paymentIntentId` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `orderitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `itemId` int NOT NULL,
  `count` int NOT NULL DEFAULT '1',
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `netPrice` decimal(10,2) NOT NULL,
  `vat` decimal(5,2) NOT NULL,
  `priceReduce` float DEFAULT '0',
  PRIMARY KEY (`id`)
) 

CREATE TABLE `orderstatusenum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) 


CREATE TABLE `pickupaddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) NOT NULL,
  `Country` varchar(2) NOT NULL,
  `City` varchar(250) NOT NULL,
  `ZipCode` varchar(250) NOT NULL,
  `Address` varchar(250) NOT NULL,
  `ContactName` varchar(250) DEFAULT NULL,
  `Email` varchar(250) DEFAULT NULL,
  `Phone` varchar(250) DEFAULT NULL,
  `isDefault` tinyint NOT NULL DEFAULT '0',
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `printedlabels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parcelnumber` mediumtext NOT NULL,
  `parcelId` int NOT NULL,
  `orderId` int NOT NULL,
  `printOrientation` int NOT NULL,
  `createdBy` int NOT NULL, --MyGLS accountId
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `printerrorlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ErrorDescription` varchar(250) NOT NULL,
  `errorCode` int NOT NULL,
  `orderId` int NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `printorientationenum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` char(250) NOT NULL,
  `categoryId` int NOT NULL,
  `brandID` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `imgurl` varchar(250) NOT NULL,
  `isFeatured` tinyint DEFAULT '0',
  `netPrice` decimal(10,2) NOT NULL,
  `vat` decimal(5,2) NOT NULL,
  `priceReduce` float DEFAULT '0',
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isdeleted` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) 

CREATE TABLE `session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sessionKey` char(250) NOT NULL,
  `accountId` int NOT NULL DEFAULT '0',
  `groupId` int NOT NULL DEFAULT '0',
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `shoppingcartitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemId` int NOT NULL,
  `sessionKey` char(250) DEFAULT NULL,
  `accountId` int DEFAULT NULL,
  `count` int NOT NULL DEFAULT '1',
  `creationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) 