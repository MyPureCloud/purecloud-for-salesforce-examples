/**
 * @description       : purecloudSalesforceEvents js file
 * @author            : developer
 * @group             :
 * @last modified on  : 04-16-2023
 * @last modified by  : developer
 * Modifications Log
 * Ver   Date         Author      Modification
 * 1.0   04-16-2023   developer   Initial Version
**/
import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// Import message service features required for subscribing and the message channel
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/purecloud__ClientEvent__c';

export default class PurecloudSalesforceEvents extends LightningElement {
    
    subscription = null;
    eventlogs = '';

    @wire(MessageContext)
    messageContext;

    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleMessage(message) {        
        this.eventlogs = this.eventlogs+JSON.stringify(message)+'<br/><br/>';
        if (message) {
            console.log(JSON.stringify(message));
        }
    }

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    // Helper
    dispatchToast(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading contact',
                message: JSON.stringify(error),
                variant: 'error',
            })
        );
    }
}