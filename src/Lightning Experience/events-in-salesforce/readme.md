# Events in Salesforce Lightning app

This repository contains an example component that allows Salesforce Lightning Experience users to test Genesys Cloud for Salesforce events in a Salesforce Lightning app.

## Table of contents

* [Getting started](#getting-started)
  * [TL;DR](#tldr)
  * [Prerequisites](#prerequisites)
* [Installation](#installation)
  * [Check the version of the managed package](#check-the-version-of-the-managed-package)
  * [Create a Lightning component](#create-a-lightning-component)
  * [Add a utility item](#add-a-utility-item)
* [Configuration](#configuration)
* [Usage](#usage)
* [Additional information](#additional-information)

## Getting started

### TL;DR

1. Check the version of your Genesys Cloud for Salesforce managed package.
2. Create a Lightning app with the example code in the repository.
3. Enable client events in Genesys Cloud for Salesforce.
4. Use the example app to test Genesys Cloud for Salesforce events.

### Prerequisites

* Version of the [Genesys Cloud for Salesforce](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N30000000pvMdEAI) managed package that supports Lightning Message Service.

## Installation

### Check the version of the managed package

1. Check the version of your Genesys Cloud for Salesforce managed package.
2. If the managed package does not support Lightning Message Service, update the managed package to a version that supports Lightning Message Service.

### Create a Lightning component

1. In the Developer Console, click **File** > **New** > **Lightning Component**.
2. Enter a name for your Lightning Bundle and click **Submit**.
3. Copy the contents of **PCSalesforceEventsExample.cmp** in the repository to your file and then save the file.
4. In the Lightning component navigation, click **Controller**.
5. Copy the contents of **PCSalesforceEventsExampleController.js** in the repository to your file and then save the file.
6. In the Lightning component navigation, click **Helper**.
7. Copy the contents of **PCSalesforceEventsExampleHelper.js** in the repository to your file and then save the file.
8. In the Lightning component navigation, click **Style**.
9. Copy the contents of **PCSalesforceEventsExample.css** in the repository to your file and then save the file.

### Add a utility item

1. In Salesforce Lightning Experience, click **Setup**.
2. Search for and click **App Manager**.
3. Find a Lightning app.
4. Click **Arrow** > **Edit**.
5. Under **App Settings**, click **Utility Items**.
6. Click **Add Utility Item**.
7. Select the Lightning component that you created.
8. Set **Panel Width** to **340** and **Panel Height** to **480**.
9. Select **Start automatically**.
10. Click **Save**.

The Lightning component now appears on the lower-left corner of certain Lightning Experience pages.

## Configuration

1. In Salesforce Lightning Experience, click **Setup**.
2. Search for and click **Installed Packages**.
3. On the **Installed Packages** page, click **Configure** next to the Genesys Cloud for Salesforce package.
4. Under **Choose a Call Center**, select **Genesys Cloud for Salesforce Lightning**.
5. Under **Client Event Settings**, configure **Client Event Messages**.
6. For **Client Event Message Type**, select **Lightning Message Channel**.
6. For **Client Event Types**, at a minimum move **Interaction** and **UserAction** from **Available** to **Chosen**.
7. Click **Save**.

## Usage

After you complete the steps under **Installation** and **Configuration**, click the Lightning component to test Salesforce events.

* You can change the status of your user.
* You can also change the state of an active interaction with pickup, disconnect, hold, mute, or secure pause.

## Additional information

* [Configure client events](https://help.mypurecloud.com/?p=241665) in the Genesys Cloud Resource Center
* [Events in Salesforce](https://help.mypurecloud.com/?p=77239) in the Genesys Cloud Resource Center
* [About Genesys Cloud for Salesforce](https://help.mypurecloud.com/?p=65221) in the Genesys Cloud Resource Center

This content is [licensed](/LICENSE) under the MIT license.


