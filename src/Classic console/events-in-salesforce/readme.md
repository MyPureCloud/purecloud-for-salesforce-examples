# Classic Console events 
A sample component to experiment with PureCloud for Salesforce events Console mode

# Table of Contents

* [Getting Started](#getting-started)
  * [TL;DR](#tldr)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
* [Additional Information](#additional-information)

# Getting Started

## TL;DR

1. Make sure your PureCloud for Salesforce integration and CTI softphone are set up in your organization.
2. Use the example code in the repository to create a visualforce page.
3. Use the example app to explore client events.

## Prerequisites

* Version 2.49 or later of the [PureCloud for Salesforce](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N30000000pvMdEAI) managed package installed in your Salesforce organization.

# Installation
1. Make sure your PureCloud for Salesforce example is set up in your organization and that your lightning app has a CTI Softphone.
2. Open the Salesforce **Developer Console** 
3. Click on **File** > **New** > **Visualforce Page**
4. Add the code contained in the example and save your page.
5. Navigate to **Setup** and search for **Custom Console Components**
6. Click **New**
7. Select a **Name** and **Button Name** for your component
8. In the **Component** field locate the Visualforce Page you just created
9. Click **Save**
10. Navigate to **Setup** and search for **Apps**
11. Find your Console App and click **Edit**
12. Find the section called **Choose Console Components**. 
13. Under **Available Items**, locate your visualforce page and click **Add**.
14. click **Save**
15. You should see the Visualforce Component on your Console app.

## usage
Once the component is installed, you can interact with the PureCloud for Salesforce plugin using events. You can change the status of your user and if there is an active event, you can use the component to pickup, disconnect, toggle hold, toggle mute, and toggle secure pause. See [Events in Salesforce](https://help.mypurecloud.com/articles/events-in-salesforce/) for more information 

# Additional Information

* This content is [licensed](LICENSE) under the MIT license