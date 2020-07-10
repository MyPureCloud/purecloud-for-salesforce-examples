# Genesys Cloud for Salesforce SDK Examples
This repository contains examples for the Genesys Cloud for Salesforce SDK Open CTI Extensions.


# Table of Contents

* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [REST Class](#rest-class)
  * [Interfaces](#interfaces)
  * [Usage](#usage)
  * [Example 1](#example-1)
* [Additional Information](#additional-information)


# Getting started

## Prerequisites

* The [Genesys Cloud for Salesforce](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N30000000pvMdEAI) managed package installed in your Salesforce organization.
* [Record Types](https://help.salesforce.com/articleView?id=customize_recordtype.htm&type=5) must be created in your Salesforce organization


## CTI Extensions

A set of interfaces that allow developers to extend specific Salesforce Open CTI methods with the Genesys Cloud for Salesforce integration

You can use the CTI Extensions by implementing the appropriate interfaces and selecting your class in the Salesforce package settings. 

## Interfaces

* purecloud.CTIExtension.ClickToDial
* purecloud.CTIExtension.ScreenPop
* purecloud.CTIExtension.SaveLog


## Usage

Use these interfaces to add your own functionality to Salesforce Open CTI methods


## Example: Setting a Task Record Type Id on SaveLog

This example shows how to do the following actions:

* Get an interaction from event data
* Get a list of Record Types 
* Create a task from event data
* Assign a record type to a task 


### Apex Code

```
global with sharing class CustomCTIExtensions implements pcdevpackageorg.CTIExtension.SaveLog 
{

    public String onSaveLog(String data) {
        Map<String, Object> eventData = (Map<String, Object>) JSON.deserializeUntyped(data);
        Map<String, Object> interaction = ( Map<String, Object>) eventData.get('interaction');
        Map<String, Object> callLog = ( Map<String, Object>) eventData.get('callLog');
        String direction = (String)interaction.get('direction');
        String callLogId = '';

        Map<String, Schema.RecordTypeInfo> recordTypes = Schema.SObjectType.Task.getRecordTypeInfosByName();
        Task t = (Task) JSON.deserialize(JSON.serialize(callLog), Task.class);
        if (direction.toLowerCase() == 'outbound') {
            Schema.RecordTypeInfo selectedType = recordTypes.get('Sales Record Type');
            t.recordTypeId =  selectedType.recordTypeId;
        } 
        
        upsert t;
        callLogId = t.Id;
        
        return callLogId;
    }

}
```


## Additional Information

This content is [licensed](/LICENSE) under the MIT license.

For more information about Genesys Cloud for Salesforce, see [About Genesys Cloud for Salesforce (Resource Center)](https://help.mypurecloud.com/?p=65221).
