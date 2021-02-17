public with sharing class DoNotCallManager {
  private static final String endpointTmpl = '/api/v2/outbound/dnclists/{0}/phonenumbers';

  public static Boolean bypassTrigger = false;

  public static String getDNCListId() {
    Genesys_Cloud_DNC_List__c dncListSettings = Genesys_Cloud_DNC_List__c.getValues(
      'DNC_List_Id'
    );
    return dncListSettings.DNC_List_Id__c;
  }

  @future(callout=true)
  public static void addPhoneNumber(String contactId, String phoneNumber) {
    try {
      String dncListId = getDNCListId();
      String endpoint = String.format(
        endpointTmpl,
        new List<String>{ dncListId }
      );
      String payload = JSON.serialize(new List<String>{ phoneNumber });
      HttpResponse response = purecloud.SDK.Rest.post(endpoint, payload);
      if (response.getStatusCode() != 200) {
        // This static variable is used in the trigger to
        // decide whether to update the DoNotCall field.
        DoNotCallManager.bypassTrigger = true;
        // The request failed. Set DoNotCall back to false.
        Contact contact = [
          SELECT Id, DoNotCall
          FROM Contact
          WHERE Id = :contactId
          LIMIT 1
        ];
        contact.DoNotCall = false;
        update contact;
        // Reset the static variable for any additional processing
        DoNotCallManager.bypassTrigger = false;
      }
    } catch (Exception e) {
      System.debug(e.getMessage());
    }
  }
}
