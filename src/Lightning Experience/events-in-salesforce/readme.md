# Events in Salesforce Lightning App
This repository contains an example component that allows Salesforce Lightning Experience users to test PureCloud for Salesforce events in a Salesforce Lightning app.

# :warning: Warning
The example code contained in this repository utilizes Lightning Message Service, which is still a beta feature in Salesforce and is not available yet in released versions of the PureCloud for Salesforce managed package.

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

1. Check the version of your PureCloud for Salesforce managed package.
2. Create a Lightning app with the example code in the repository.
3. Enable client events in PureCloud for Salesforce.
4. Use the example app to test PureCloud for Salesforce events.

## Prerequisites

* PureCloud for Salesforce installed in your Salesforce organization using a version of the [PureCloud for Salesforce](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N30000000pvMdEAI) managed package that supports Lightning Message Service.

# Installation

### Check the Version of the Managed Package

1. Check the version of your PureCloud for Salesforce managed package.
2. If the managed package is not a version that supports Lightning Message Service, update the managed package.

### Create a Lightning Component
1. In the Developer Console, click **File** > **New** > **Lightning Component**.
2. Enter a name for your Lightning Bundle and click **Submit**.
3. Copy the contents of **PCSalesforceEventsExample.cmp** in the repository to your file and then save the file.
4. In the Lightning component navigation, click **Controller**.
5. Copy the contents of **PCSalesforceEventsExampleController.js** in the repository to your file and then save the file.
6. In the Lightning component navigation, click **Helper**.
7. Copy the contents of **PCSalesforceEventsExampleHelper.js** in the repository to your file and then save the file.
8. In the Lightning component navigation, click **Style**.
9. Copy the contents of **PCSalesforceEventsExample.css** in the repository to your file and then save the file.

### Add a Utility Item

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

# Configuration

1. In Salesforce Lightning Experience, click **Setup**.
2. Search for and click **Installed Packages**.
3. On the **Installed Packages** page, click **Configure** next to the PureCloud for Salesforce package.
4. Under **Choose a Call Center**, select **PureCloud for Salesforce Lightning**.
5. Select **Enable Client Events**.
6. Under **Client Event Types**, at a minimum move **Interaction** and **UserAction** from **Available** to **Chosen**.
7. Click **Save**.

## Usage

After you complete the steps under **Installation** and **Configuration**, click the Lightning component to test Salesforce events.

* You can change the status of your user.
* You can also change the state of an active interaction with pickup, disconnect, hold, mute, or secure pause.

For more information, see [Events in Salesforce (Resource Center)](https://help.mypurecloud.com/?p=77239).

# Additional Information

This content is [licensed](LICENSE) under the MIT license.

For more information about PureCloud for Salesforce, see [About PureCloud for Salesforce (Resource Center)](https://help.mypurecloud.com/?p=65221).
