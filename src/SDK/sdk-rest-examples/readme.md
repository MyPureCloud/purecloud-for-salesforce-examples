# Genesys Cloud for Salesforce SDK Examples
This repository contains examples for the Genesys Cloud for Salesforce SDK REST client.

## Prerequisites

* The [Genesys Cloud for Salesforce](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N30000000pvMdEAI) managed package installed in your Salesforce organization.

* [Authentication must be configured](https://help.mypurecloud.com/articles/configure-authentication/) in the Genesys Cloud for Salesforce package 

## REST Class

Contains static methods to expose Genesys Cloud API.

You can access the REST API through the REST class under the purecloud.SDK.REST namespace. The methods we expose are get, put, post, and delete. Currently, we are unable to support patch through the Salesforce Apex API.

## Namespace

purecloud.SDK.Rest

## Usage

These methods are designed to provide more flexibility for the Genesys Cloud for Salesforce integration by allowing developers to access the Genesys Cloud API directly from your Salesforce environment through Apex code.

## Example 1

This example shows how to do the following action:
* Get a user profile from Genesys Cloud

Apex Code:

    HttpResponse response = purecloud.SDK.Rest.get('/platform/api/v2/users/0c2b31d0-9f8b-4328-97f2-50ffe98bee50/profile');

Example response:

    {
        "id": "0c2b31d0-9f8b-4328-97f2-50ffe98bee50",
        "state": "active",
        "dateModified": "2020-05-11T17:16:50Z",
        "version": 11,
        "selfUri": "/api/v2/users/0c2b31d0-9f8b-4328-97f2-50ffe98bee50/profile",
        "organizationId": "",
        "general": {
            "name": [
                {
                    "_id": "1JB9ZmJnCCKXlerwxAOZXC",
                    "value": "John Doe",
                    "labelKey": "name"
                }
            ]
        },
        "divisionId": "66a36751-2e12-4a41-b436-b86cf5edeb45"
    }

## Example 2

This example shows how to do the following actions:
* Route a Salesforce email to a specified queue.
* Screen pop a specified Salesforce page using the attributes property.

![Resulting Action](https://github.com/MyPureCloud/purecloud-for-salesforce-examples/blob/sdk-rest-api-examples/src/SDK/sdk-rest-examples/assets/img/email-example.png)

Apex Code:

    Map<String, Object> payload = new Map<String, Object>();
    payload.put('queueId', '8897431f-99d9-4cfe-b098-d279c7776a49');
    payload.put('provider', 'Salesforce');
    payload.put('attributes', new Map<String, String>{ 'SF_URLPop' => '00336000003QVQm'}); 
    HttpResponse response = purecloud.SDK.REST.post('/platform/api/v2/conversations/emails', JSON.serialize(payload));

Resulting Payload:

    {
        "queueId": "8897431f-99d9-4cfe-b098-d279c7776a49",
        "provider": "Salesforce",
        "attributes": {
            "SF_URLPop": "00336000003QVQm"
        }
    }

Example Response:

    {
        "id": "3f5ce394-0156-47a2-84af-9cfb6eb27b1e",
        "otherMediaUris": [],
        "selfUri": "/api/v2/conversations/emails/3f5ce394-0156-47a2-84af-9cfb6eb27b1e"
    }

## Example 3

This example shows how to do the following actions:
* create a callback with username and callback number.
* route a callback to a specified queue

![Resulting Action](https://github.com/MyPureCloud/purecloud-for-salesforce-examples/blob/sdk-rest-api-examples/src/SDK/sdk-rest-examples/assets/img/callback-example.png)

Apex Code:

    Map<String, Object> payload = new Map<String, Object>();
    payload.put('callbackNumbers', new List<String> { '+13172222222' });
    payload.put('callbackUserName', 'John Doe');
    payload.put('routingData', new Map<String, String>{'queueId' => '8897431f-99d9-4cfe-b098-d279c7776a49'});
    HttpResponse response = purecloud.SDK.REST.post('/platform/api/v2/conversations/callbacks', JSON.serialize(payload));

Resulting payload:

    {
        "callbackNumbers":["+13172222222"],
        "callbackUserName": "John Doe", 
        "routingData":{
            "queueId":"8897431f-99d9-4cfe-b098-d279c7776a49"
        }
    }

Example Response:

    {
        "conversation": {
            "id": "71af6666-6742-43a4-bdf2-b46460471cc6",
            "selfUri": "/api/v2/conversations/71af6666-6742-43a4-bdf2-b46460471cc6"
        },
        "callbackIdentifiers": [
            {
                "type": "EXTERNAL",
                "id": "4f27a813-32ce-470e-a0e8-9672123e324b"
            },
            {
                "type": "ACD",
                "id": "b97adf09-7266-4844-a6a2-6f2495a6ab74"
            }
        ]
    }

## Additional Information

This content is [licensed](LICENSE) under the MIT license.

For more information about PureCloud for Salesforce, see [About PureCloud for Salesforce (Resource Center)](https://help.mypurecloud.com/?p=65221).