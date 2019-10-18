# Lightning Experience events 
A sample component to experiment with PureCloud for Salesforce events in Lightning.

# Table of Contents

* [Getting Started](#getting-started)
  * [TL;DR](#tldr)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Configuration](#configuration)
  * [Usage](#usage)
* [Additional Information](#additional-information)

# Getting Started

## TL;DR

1. Make sure your PureCloud for Salesforce integration and CTI softphone are set up in your organization.
2. Use the example code in the repository to create a lightning app.
3. Enable client events in PureCloud for Salesforce.
4. Use the example app to explore client events.

## Prerequisites

* Version 2.49 or later of the [PureCloud for Salesforce](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N30000000pvMdEAI) managed package installed in your Salesforce organization.

# Installation
1. Make sure your PureCloud for Salesforce example is set up in your organization and that your lightning app has a CTI Softphone.
2. Open the Salesforce **Developer Console** 
3. Click on **File** > **New** > **Lightning Component**
4. Add the code contained in the example 
5. Navigate to **Setup** and search for **App Manager**
6. Find your Lightning App and click **Edit**
7. Click on Utility Item and click **Add Utility Item**
8. Locate the Lightning Component you just created.
9. Selct a Label and Icon of your choice. 
10. Set Panel Width to 340 and Panel Height to 480. Be sure **Start Automatically** is checked (if not you will not be able to use the example app)
11. Click **Save**
12. Navigate to the Lightning App. You should see the component on your Utility Bar 

# Configuration 
1. In your Salesforce organization, click **Configure** next to the PureCloud for Salesforce managed package.
2. Under **Choose a Call Center**, select **PureCloud for Salesforce Lightning**.
3. Select **Enable Client Events**.
4. Under **Client Event Types**, make sure at least **Interaction** and **UserAction** are selected. Click the right arrow to add them under **Chosen**.
6. Click **Save.**

## usage
Once the component is installed, you can interact with the PureCloud for Salesforce plugin using events. You can change the status of your user and if there is an active event, you can use the component to pickup, disconnect, toggle hold, toggle mute, and toggle secure pause. See [Events in Salesforce](https://help.mypurecloud.com/articles/events-in-salesforce/) for more information 

# Additional Information

* This content is [licensed](LICENSE) under the MIT license