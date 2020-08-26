public with sharing class DoNotCallManager {
  private static final String endpointTmpl = '/api/v2/outbound/dnclists/{0}/phonenumbers';

  public static String getDNCListId() {
    PureCloud_DNC_List__c dncListSettings = PureCloud_DNC_List__c.getValues('DNC_List_Id');
    return dncListSettings.DNC_List_Id__c;
  }

  @future(callout=true)
  public static void addPhoneNumber(String phoneNumber) {
    try {
      String dncListId = getDNCListId();
      String endpoint = String.format( endpointTmpl, new List<String>{ dncListId });
      String payload = JSON.serialize(new List<String>{ phoneNumber });
      HttpResponse response = purecloud.SDK.Rest.post(endpoint, payload);
      if (response.getStatusCode() != 200) {
        System.debug('Failed to add phone number to DNC list.');
      }
    } catch (Exception e) {
      System.debug(e.getMessage());
    }
  }
}
