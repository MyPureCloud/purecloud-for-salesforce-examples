# Events in Salesforce Lightning app using LWC

This repository contains an example LWC that allows Salesforce Lightning Experience users to test Genesys Cloud for Salesforce events in a Salesforce Lightning app.

## Table of contents

* [Getting started](#getting-started)
  * [TL;DR](#tldr)
  * [Prerequisites](#prerequisites)
* [Installation](#installation)
  * [Check the version of the managed package](#check-the-version-of-the-managed-package)
  * [Create a Lightning component](#create-a-lightning-web-component)
  * [Add a utility item](#add-a-utility-item)
* [Configuration](#configuration)
* [Usage](#usage)
* [Additional information](#additional-information)

## Getting started

### TL;DR

1. Check the version of your Genesys Cloud for Salesforce managed package.
2. Create a Lightning app with the example LWC code in the repository.
3. Enable client events in Genesys Cloud for Salesforce.
4. Use the example app to test Genesys Cloud for Salesforce events.

### Prerequisites

* Version of the [Genesys Cloud for Salesforce](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N30000000pvMdEAI) managed package that supports Lightning Message Service.

## Installation

### Check the version of the managed package

1. Check the version of your Genesys Cloud for Salesforce managed package.
2. If the managed package does not support Lightning Message Service, update the managed package to a version that supports Lightning Message Service.

### Create a Lightning Web component

1. In the VSCode open Command Pallette by pressing **Ctrl + Shift + P**.
2. Enter a name for your Lightning Web Component and hit **Enter**.
3. Copy the contents of **purecloudSalesforceEvents.html** in the repository to your html file of the LWC bundle and then save the file.
5. Copy the contents of **purecloudSalesforceEvents.js** in the repository to your js file of the LWC bundle and then save the file.
7. Copy the contents of **purecloudSalesforceEvents.js-meta.xml** in the repository to your meta file of the LWC bundle and then save the file.

### Add a utility item

1. In Salesforce Lightning Experience, click **Setup**.
2. Search for and click **App Manager**.
3. Find your Lightning app.
4. Click **Arrow** > **Edit**.
5. Under **App Settings**, click **Utility Items**.
6. Click **Add Utility Item**.
7. Select the Lightning component that you created.
8. Set **Panel Width** to **340** and **Panel Height** to **480**.
9. Select **Start automatically**.
10. Click **Save**.

The Lightning Web component now appears on the lower-left corner of the specified Lightning App.

## Configuration

1. In Salesforce Lightning Experience, click **Setup**.
2. Search for and click **Installed Packages**.
3. On the **Installed Packages** page, click **Configure** next to the Genesys Cloud for Salesforce package.
4. Under **Choose a Call Center**, select **Genesys Cloud for Salesforce Lightning**.
5. Under **Client Event Settings**, configure **Client Event Messages**.
6. For **Client Event Message Type**, select **Lightning Message Channel**.
7. For **Client Event Types**, at a minimum move **Interaction** and **UserAction** from **Available** to **Chosen**.
8. Click **Save**.

## Usage

After you complete the steps under **Installation** and **Configuration**, click the Lightning component to test Salesforce events.

* You can change the status of your user.
* You can also change the state of an active interaction with pickup, disconnect, hold, mute, or secure pause.

## Additional information

* [Configure client events](https://help.mypurecloud.com/?p=241665) in the Genesys Cloud Resource Center
* [Events in Salesforce](https://help.mypurecloud.com/?p=77239) in the Genesys Cloud Resource Center
* [About Genesys Cloud for Salesforce](https://help.mypurecloud.com/?p=65221) in the Genesys Cloud Resource Center

This content is [licensed](/LICENSE) under the MIT license.


