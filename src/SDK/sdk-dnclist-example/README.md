# Update a Genesys Cloud Do Not Contact list with the Genesys Cloud for Salesforce SDK

This Genesys Cloud Blueprint illustrates how to use the Genesys Cloud for Salesforce SDK to add the primary phone number of a Salesforce Contact to a Genesys Cloud Do Not Contact (DNC) list. The management of DNC lists is a crucial component to campaign management. In Genesys Cloud, you create and manage DNC lists. With the Genesys Cloud for Salesforce SDK, you can integrate these lists with your Salesforce organization.

This blueprint is fully functional, but outlines a simple implementation. For a more robust implementation, you can modify it to handle multiple phone number fields (home, mobile, other) or change the code to handle bulk insert and update operations. For more information, see the [Additional resources](#additional-resources "Goes to the Additional resources section") section.

**Solution components**:

* **Genesys Cloud**: The Genesys cloud-based contact center platform. You create and manage DNC lists in Genesys Cloud.
* **Salesforce**: The Salesforce cloud-based customer relationship management (CRM) platform.
* **Genesys Cloud for Salesforce**: The Genesys Cloud integration that embeds Genesys Cloud inside Salesforce.
* **Genesys Cloud for Salesforce managed package**: The managed package that contains all the installation components, including the Genesys Cloud for Salesforce SDK, necessary to run Genesys Cloud for Salesforce.
* **Genesys Cloud for Salesforce SDK**: The SDK included in the managed package that allows you to customize actions in Genesys Cloud for Salesforce. The SDK uses the Salesforce Apex programming language.

## Plan the solution

This solution requires permissions and configuration with both Genesys Cloud and Salesforce.

The solution also requires installation of the Genesys Cloud for Salesforce managed package. You can download the managed package from the [Salesforce AppExchange](https://appexchange.salesforce.com/ "Opens the Salesforce AppExchange").

### Specialized knowledge

Implementing this solution requires experience in several areas or a willingness to learn:

* Administrator-level knowledge of Genesys Cloud.
* Familiarity with Salesforce Administration and Apex code.

### Genesys Cloud requirements

This solution requires a Genesys Cloud license. For more information on licensing, see [Genesys Cloud pricing](https://www.genesys.com/pricing "Opens the Genesys Cloud pricing page").

The solution also requires an OAuth client with roles that include the Campaign Management permissions and the **Outbound** > **DNC List** > **Add** permission. For more information, see [OAuth client permissions for Genesys Cloud for Salesforce](https://help.mypurecloud.com/?p=188903 "Opens the OAuth client permissions for Genesys Cloud for Salesforce article") and [Create an OAuth Client](https://help.mypurecloud.com/?p=188903 "Opens the Create an OAuth Client article").

### Salesforce requirements

This solution requires a Salesforce organization with the Genesys Cloud for Salesforce integration installed and configured. For more information about installation and configuration, see [Install or upgrade the Genesys Cloud for Salesforce managed package](https://help.mypurecloud.com/?p=39356/ "Opens the Install or upgrade the Genesys Cloud for Salesforce managed package article") and [Set up a call center in Salesforce](https://help.mypurecloud.com/?p=10593 "Opens the Set up a call center in Salesforce article").

The solutions engineer must have a System Administrator profile. For more information, see [Standard Profiles](https://help.salesforce.com/articleView?id=standard_profiles.htm&type=5 "Opens Standard Profiles in the Salesforce documentation") in the Salesforce documentation.

## Implementation steps

- [Create an internal DNC list in Genesys Cloud](#create-an-internal-dnc-list-in-genesys-cloud)
- [Create a custom setting in Salesforce](#create-a-custom-setting-in-salesforce)
- [Configure the Do Not Call field in Salesforce](#configure-the-do-not-call-field-in-salesforce)
- [Create an Apex trigger and class](#create-an-apex-trigger-and-class)
  - [Create the DoNotCallManager class in Salesforce](#create-the-donotcallmanager-class-in-salesforce)
  - [Create the Contact trigger in Salesforce](#create-the-contact-trigger-in-salesforce)
- [Test your work](#test-your-work)

## Create an internal DNC list in Genesys Cloud

1. In your Genesys Cloud organization, create an internal DNC list.

    The **assets/data/** folder contains an example .csv file that you use. For more information, see [Create a new internal DNC list](https://help.mypurecloud.com/?p=4107 "Opens the Create a new internal DNC list article").

2. Copy and save the ID of the DNC list.

    You will use this ID after you create a custom field. See the [Create a custom setting in Salesforce](#create-a-custom-setting-in-salesforce) section.

    ![Copy DNC list ID from URL](/src/SDK/sdk-dnclist-example/assets/img/copy-dnc-list-id.gif)

## Create a custom setting in Salesforce

Use a custom setting to store the ID of the DNC list.

1. Create a custom setting with following values:
    >**Note**: If **Setting Type** is grayed out, enable **Manage List Custom Settings Type**. For more information, see [List Custom Setting is greyed out](https://help.salesforce.com/articleView?id=000317370&language=en_US&type=1&mode=1 "Opens List Custom Setting is greyed out in the Salesforce documentation") in the Salesforce documentation.

    * **Object Name**: PureCloud_DNC_List
    * **Setting Type**: List

    For more information, see [Create Custom Settings](https://help.salesforce.com/articleView?id=cs_about.htm&type=5 "Opens Create Custom Settings in the Salesforce documentation") in the Salesforce documentation.

2. Add a custom field to the custom setting with the following values:
    >**Note**: **Length** must be 36 or greater.

    * **Data Type**: Text
    * **Length**: 36
    * **Field Name**: DNC_List_Id

    For more information, see [Add Custom Settings Fields](https://help.salesforce.com/articleView?id=cs_add_fields.htm&type=5 "Opens Add Custom Settings Fields in the Salesforce documentation") in the Salesforce documentation.

3. Add the ID of the DNC list to the custom field.

    a. Click **Setup**.

    b. Search for and click **Custom Settings**.

    c. Click **Manage** next to PureCloud_DNC_List. This is the custom setting that you created in step 1.

    d. Click **New**.

    e. For **Name**, enter **DNC_List_Id**.

    f. For **DNC_List_Id**, enter the ID of the DNC list that you copied and saved earlier. See the [Create an internal DNC list in Genesys Cloud](#create-an-internal-dnc-list-in-genesys-cloud "Goes to the Create an internal DNC list in Genesys Cloud section") section.

    g. Click **Save**.

## Configure the Do Not Call field in Salesforce

This field is hidden by default. You must make the field visible to profiles and then add the field to **Contact Layout**.

1. Set **Field-Level Security** for the **Do Not Call** field to **Visible**.

    a. Find the Contact field called **Do Not Call**.

    b. Click **Set Field-Level Security**.

    c. Under **Visible**, select the profiles that you want to be able to see the **Do Not Call** field.

    d. Click **Save**.

    For more information, see [Set Field-Level Security for a Single Field on All Profiles](https://help.salesforce.com/articleView?id=users_fields_fls.htm&type=5 "Opens Set Field-Level Security for a Single Field on All Profiles in the Salesforce documentation") in the Salesforce documentation.

2. Add **Do Not Call** to **Contact Layout**.

    a. Open the page layout for Contacts.

    b. Drag the **Do Not Call** field to the **Contact Information** section.

    c. Click **Save**.

    For more information, see [Page Layouts](https://help.salesforce.com/articleView?id=customize_layout.htm&type=5 "Opens Page Layouts in the Salesforce documentation") in the Salesforce documentation.

    ![Drag Do Not Call field into Contact Information section](/src/SDK/sdk-dnclist-example/assets/img/contact-do-not-call.gif)

    A **Do Not Call** check box now appears on all Contact records in Salesforce for the profiles that you selected.


## Create an Apex trigger and class

This solution uses an Apex trigger and an Apex class to capture the click of a check box and call the Genesys Cloud Platform API. If, during an insert or update, the **Do Not Call** field is selected, the trigger code calls a custom class that connects to the Genesys Cloud Platform API and adds the phone number of the Contact to the DNC list.

Because the SDK makes asynchronous calls to the Genesys Cloud Platform API, the class method must include a `future` annotation. The `future` annotation designates the callout as asynchronous.

For more information, see [Classes](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_understanding.htm "Opens Classes in the Apex Developer Guide") and [Future Annotation](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_future.htm?search_text=@future "Opens Future Annotation in the Apex Developer Guide") in the Apex Developer Guide.

### Create the DoNotCallManager class in Salesforce

1. In the Developer Console, click **File** > **New** > **Apex Class**.
2. For the class name, enter **DoNotCallManager**, and then click **OK**.
3. Replace the default code with the code found at `src/classes/DoNotCallManager.cls`.
4. Save the file.

#### Phone numbers

The `addPhoneNumber` method in the class uses the SDK to add the phone number to the DNC list with a POST request to `/api/v2/outbound/dnclists/{dncListId}/phonenumbers`. In this solution, only a single phone number is added per request, but this endpoint can handle multiple phone numbers in a single request.

The following Apex code is a simplified example of the SDK request in the `addPhoneNumber` method. The code uses the POST method of the SDK to send a request containing an array of phone numbers to the API endpoint.

```
String payload = JSON.serialize(new List<String>{ phoneNumber });

HttpResponse response = purecloud.SDK.Rest.post(
'/api/v2/outbound/dnclists/{dncListId}/phonenumbers', payload );
```

### Create the Contact trigger in Salesforce

1. In the Developer Console, click **File** > **New** > **Apex Trigger**.
2. For **Name**, enter **ContactTrigger**.
3. For **sObject**, select **Contact**.
3. Replace the default code with the code found at `src/triggers/ContactTrigger.trigger`.
4. Save the file.

## Test your work

1. In Salesforce, create a new Contact and select the **Do Not Call** check box.
2. In Genesys Cloud, export the DNC list that you created earlier.

  The phone number of your new Contact appears in the exported .csv file. For more information, see [Download DNC records](https://help.mypurecloud.com/?p=39880 "Opens the Download DNC records article").

## Troubleshooting

For troubleshooting information, see the Salesforce section at [Troubleshoot the Genesys Cloud Embedded Clients](https://help.mypurecloud.com/?p=167230 "Opens the Troubleshoot the Genesys Cloud Embedded Clients article") and the Troubleshooting section at [Platform API](https://developer.mypurecloud.com/api/rest/index.html#troubleshooting "Opens the Platform API page").

## Additional resources

* [Do not contact lists view](https://help.mypurecloud.com/?p=44349 "Opens the Do not contact lists view article") (Genesys Cloud Resource Center)
* [Salesforce Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_gov_limits.htm "Opens the Salesforce Execution Governors and Limits article") (Apex Developer Guide)
* [Bulk Triggers](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_triggers_bulk.htm "Opens the Bulk Triggers article") (Apex Developer Guide)
* [About Genesys Cloud for Salesforce](https://help.mypurecloud.com/?p=65221 "Opens the About Genesys Cloud for Salesforce article") (Genesys Cloud Resource Center)
* [About Campaign Management in Genesys Cloud for Salesforce](https://help.mypurecloud.com/?p=153769 "Opens the About Campaign Management in Genesys Cloud for Salesforce") (Genesys Cloud Resource Center)

This content is [licensed](/LICENSE) under the MIT license.
