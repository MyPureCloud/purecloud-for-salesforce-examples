# Updating a Genesys Cloud Do-Not-Call List With the Genesys Cloud for Salesforce SDK

As a Salesforce admin, consultant or developer, you likely understand the importance of a do-not-call (DNC) list to any organization and their campaigns. The [Genesys Cloud](https://www.genesys.com/genesys-cloud "Opens the Genesys Cloud landing page") allows you to create and manage centralized DNC lists and integrate those DNC lists with the Salesforce platform through the [Genesys Cloud for Salesforce SDK](https://help.mypurecloud.com/articles/sdks-in-genesys-cloud-for-salesforce/ "Opens the Genesys Cloud for Salesforce SDK article").

The SDK allows you to easily authenticate and make RESTful requests to the Genesys Cloud Platform API using Apex code. To access the SDK, you must install the [Genesys Cloud for Salesforce integration](https://help.mypurecloud.com/articles/about-genesys-cloud-for-salesforce/ "Opens the Genesys Cloud for Salesforce article"), which is available through the [Salesforce AppExchange](https://appexchange.salesforce.com/ "Opens the Salesforce AppExchange").

This blueprint illustrates how to use the SDK to add the primary phone number of a Salesforce Contact to a Genesys Cloud DNC list when the **Do Not Call** field is enabled on the Contact in Salesforce.

Though fully functional, the blueprint is minimal and meant to serve as a launch point. Depending on your needs, you will want to handle multiple phone number fields (home, mobile, other) or modify the code to [handle bulk insert and update operations](https://trailhead.salesforce.com/content/learn/modules/apex_triggers/apex_triggers_bulk "Opens the Apex Triggers document"). To learn more about these topics, see the [Additional resources](#additional-resources "Jumps to the Additional resources section") section below.

# Plan the solution
This solution requires permissions and configuration with both Genesys Cloud and Salesforce. As mentioned, it also requires installation of the Genesys Cloud for Salesforce SDK from the Salesforce AppExchange.

## Specialized knowledge
Implementing this solution requires experience in several areas or a willingness to learn:

* Administrator-level knowledge of Genesys Cloud
* Practitioner-level knowledge of Salesforce Administration and Apex

## Genesys Cloud requirements

This solution requires a Genesys Cloud license. For more information on licensing, see [Genesys Cloud Pricing](https://www.genesys.com/pricing "Opens the Genesys Cloud pricing article").

In addition to the [base Campaign Management permissions](https://help.mypurecloud.com/articles/oauth-client-permissions-for-genesys-cloud-for-salesforce/ "Opens the OAuth client permissions for Genesys Cloud for Salesforce article"), the OAuth client used by this blueprint will need the `Outbound > DNC List > Add` permission. For more information on configuring permissions, see [Create an OAuth Client](https://help.mypurecloud.com/articles/create-an-oauth-client/ "Opens the Create an OAuth Client article").

## Salesforce requirements
This solution requires a Salesforce instance with the Genesys Cloud for Salesforce integration to be installed and configured. For more information on installation and configuration, see [Install or upgrade the Genesys Cloud for Salesforce managed package](https://help.mypurecloud.com/articles/install-or-upgrade-the-genesys-cloud-for-salesforce-managed-package/ "Opens the Install or upgrade the Genesys Cloud for Salesforce managed package article") documentation.

The solutions engineer requires a Salesforce account with the [System Administrator Profile](https://help.salesforce.com/articleView?id=standard_profiles.htm&type=5 "Opens the Standard Profiles article").

# Deployment steps
- [Create a Do-Not-Call List in Genesys Cloud](#create-a-do-not-call-list-in-genesys-cloud)
- [Add a Custom Setting for the DNC List](#add-a-custom-setting-for-the-dnc-list)
- [Enable the "Do Not Call" Field in Salesforce](#enable-the-do-not-call-field-in-salesforce)
- [Create the Apex Trigger and Class](#create-the-apex-trigger-and-class)
  - [Create the Contact Trigger in Salesforce](#create-the-contact-trigger-in-salesforce)
  - [Create the DoNotCallManager Class in Salesforce](#create-the-donotcallmanager-class-in-salesforce)
  - [Call the Genesys Cloud API](#call-the-genesys-cloud-api)
- [Test your work](#test-your-work)

## Create a Do-Not-Call List in Genesys Cloud

Starting in your Genesys Cloud organization, create a DNC list. Genesys Cloud offers three types of DNC lists. This solution uses an **Internal** do-not-call list.

1. Create a DNC list in Genesys Cloud. For more information, see [Create a new internal DNC list](https://help.mypurecloud.com/articles/create-new-dnc-list/ "Opens the Create a new internal DNC list article") documentation. Make sure to choose **Internal** from the DNC List Type box.
2. An example DNC list in .csv format has been provided in the `assets/data/` folder.
3. You'll need the ID of the DNC list in a later step, so be sure to copy and save it. The ID can be copied from the end of the URL on the list's detail page or by [querying the API for the list by name](https://developer.mypurecloud.com/api/rest/v2/outbound/#get-api-v2-outbound-dnclists "Opens the Outbound Resources API document") with an API testing tool such as [Postman](https://developer.mypurecloud.com/api/rest/postman/index.html "Opens the Use Postman to test API calls article"). 

![Copying DNC list ID from URL](/src/SDK/sdk-dnclist-example/assets/img/copy-dnc-list-id.gif)

## Add a Custom Setting for the DNC List

Rather than hardcode the DNC list ID, this solution uses a Custom Setting/Custom Field combination to store the ID. To add the DNC list ID to the Custom Setting, do the following:

* Create a Custom Setting with an **Object Name** of **PureCloud_DNC_List** and a Setting Type of **List**. For more information, see [Create Custom Settings](https://help.salesforce.com/articleView?id=cs_about.htm&type=5 "Opens the Create Custom Settings article").
* Add a Custom Field to the Custom Setting with a **Data Type** of Text and a **Field Name** of **DNC_List_Id**. The field should allow for at least 36 characters. For more information, see [Add Custom Settings Fields](https://help.salesforce.com/articleView?id=cs_add_fields.htm&type=5 "Opens the Add Custom Settings Fields article").

After creating the Custom Setting and Custom Field, set the **DNC_List_Id** value to the ID of your DNC list by completing the following:

1. Click **Setup**.
2. In the **Quick Find**, type "Custom Settings" to filter the list.
3. Click the **Custom Settings** object.
4. Find **PureCloud_DNC_List** and click the **Manage** button next to the the Label.
5. Click the **New** button.
6. Enter **DNC_List_Id** for the Name and paste your DNC list ID in the **DNC_List_Id** field.
7. Click **Save**.

## Enable the "Do Not Call" Field in Salesforce

Next, enable the existing **Do Not Call** field in Salesforce. This field is hidden in the default installation.

1. Click **Setup**.
2. Click **Object Manager** (not the menu arrow) to get a list of Salesforce objects.
3. In the Object Manager **Quick Find**, type "Contact" to filter the list.
4. Click the **Contact** object.
5. Click **Fields & Relationships** from the menu on the left-hand side.
6. Find **Do Not Call** and click it.
7. Click the **Set Field-Level Security** button.
8. Under the **Visible** column, select the security profiles for which you'd like to show the field.
9. Click the **Save** button.
10. Next, click on **Page Layouts** in the left-hand menu.
11. To add the checkbox to all layouts, click the Page Layout named **Contact Layout**.
12. Scroll down to the **Contact Information** section and drag the **Do Not Call** button down into that section.
13. Click **Save** in the top left.

![Dragging Do Not Call field into Contact Information section](/src/SDK/sdk-dnclist-example/assets/img/contact-do-not-call.gif)

You should now see a checkbox labeled **Do Not Call** when creating and editing Contacts in Salesforce.

## Create the Apex Trigger and Class

This solution uses an Apex Trigger and an [Apex Class](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_understanding.htm "Opens the Apex Class article") to capture the click of a checkbox and call the Genesys Cloud Platform API. If the **Do Not Call** field is enabled on an insert or update, the Trigger code calls to a custom class that connects to the Genesys Cloud Platform API and adds the Contact's phone number. Since the SDK makes an asynchronous call to the Genesys Cloud Platform API, the class method will need a [Future Annotation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_future.htm?search_text=@future "Opens the Future Annotation article") to designate it as an asynchronous callout.

### Create the Contact Trigger in Salesforce

1. In the Developer Console, click **File** > **New** > **Apex Trigger**.
2. Enter `ContactTrigger` for the trigger name, and then select **Contact** for the sObject.
3. Replace the default code with the code found in `src/triggers/ContactTrigger.trigger`.
4. To save, press **Ctrl+S**.

We'll be making use of the `isUpdate`, `isInsert`, `isBefore` and `isAfter` Context Variables available to Apex triggers in our Salesforce Class.

### Create the DoNotCallManager Class in Salesforce

1. In the Developer Console, click **File** > **New** > **Apex Class**.
2. Enter `DoNotCallManager` for the class name, and then click **OK**.
3. Replace the default code with the code found in `src/classes/DoNotCallManager.cls`.
4. To save, press **Ctrl+S**.

### Call the Genesys Cloud API

The Genesys Cloud Platform API call is made in the `addPhoneNumber` method of the `DoNotCallManager` class. This method calls an endpoint in the [Outbound API Resource](https://developer.mypurecloud.com/api/rest/v2/outbound/#post-api-v2-outbound-dnclists--dncListId--phonenumbers "Opens the Outbound API Resource article") using the SDK. This endpoint adds a phone number to a DNC list via a POST request to `/api/v2/outbound/dnclists/{dncListId}/phonenumbers`. In this solution, only a single phone number is added per request, but this endpoint can handle multiple phone numbers in a single request.

#### Apex code

This is a simplified example of the SDK request based on the `DoNotCallManager` class. The `post` method of the SDK is used to send a request containing an array of phone numbers to the API endpoint.

```
String payload = JSON.serialize(new List<String>{ phoneNumber });

HttpResponse response = purecloud.SDK.Rest.post(
'/api/v2/outbound/dnclists/{dncListId}/phonenumbers', payload );
```

## Test your work

Having completed the steps above, you should be able to create a new Contact via the Salesforce UI and check the **Do Not Call** checkbox.

After saving the Contact, log into the Genesys Cloud Admin and export your DNC list. You should see the phone number of your new Contact in the exported .csv.

1. Click **Admin**.
2. In the Search bar, type "Outbound".
3. Select **Outbound Settings**.
4. Select **List Management** from the left-hand menu.
5. Select **Do Not Contact List** from the top tabs.
6. Find the list you created earlier and click its Name.
7. Click **Export** at the bottom of the page and open the .csv to confirm the phone number was added.

For more detailed instructions on exporting the DNC list, see [Download DNC records](https://help.mypurecloud.com/articles/download-dnc-records/ "Opens the Download DNC records article")

## Troubleshooting
For troubleshooting information, see the *Salesforce* section of [Troubleshoot the Genesys Cloud Embedded Clients](https://help.mypurecloud.com/articles/troubleshoot-the-genesys-cloud-embedded-clients/ "") and the *Troubleshooting* section of the [Platform API](https://developer.mypurecloud.com/api/rest/index.html#troubleshooting) docs.

## Additional resources
* [Do not call lists view](https://help.mypurecloud.com/articles/not-call-lists-view/ "Opens the Do not call lists view article") (Genesys Cloud Resource Center)
* [Salesforce Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_gov_limits.htm "Opens the Salesforce Execution Governors and Limits article") (Apex Developer Guide)
* [Bulk Triggers](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers_bulk.htm "Opens the Bulk Triggers article") (Apex Developer Guide)

This content is [licensed](/LICENSE) under the MIT license.

For more information about Genesys Cloud for Salesforce, see [About Genesys Cloud for Salesforce (Resource Center)](https://help.mypurecloud.com/?p=65221).
