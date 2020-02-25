({
    initComponent: function(component, event, helper) {
        var action = component.get("c.getCallCenterUrl");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS') {
                var returnedUrl = response.getReturnValue();
                var clientOrigin = returnedUrl.match(/^(http(s?):\/\/[^\/]+)/gi)[0];
                component.set('v.clientOrigin', clientOrigin);

                window.addEventListener("message", $A.getCallback(function(event) {

                    if(event.origin != clientOrigin) {
                        return;
                    }

                    if(event.data && event.data.type) {

                        if(event.source && event.data.type === 'Handshake') {
                            var message = JSON.stringify(event.data);
                            helper.outputToConsole(component, message);
                            component.set('v.postMessageSource', event.source);
                        }

                        if(event.source && event.data.type === 'Interaction') {
                            var message = JSON.stringify(event.data);
                            helper.outputToConsole(component, message);
                            if(event.data.data.id) {
                                component.set("v.interactionId", event.data.data.id );
                            }
                        }
                    }
                }), false);
            }
        });
        $A.enqueueAction(action);
    },

    statusBreak: function(component, event, helper) {
        helper.statusUpdate(component, 'Break');
    },

    statusAvailable: function(component, event, helper) {
        helper.statusUpdate(component, 'Available');
    },

    disconnect: function(component, event, helper) {
        helper.stateUpdate(component, 'disconnect');
    },

    pickup: function(component, event, helper) {
        helper.stateUpdate(component, 'pickup');
    },

    mute: function(component, event, helper) {
        helper.stateUpdate(component, 'mute');
    },

    hold: function(component, event, helper) {
        helper.stateUpdate(component, 'hold');
    },

    securePause: function(component, event, helper) {
        helper.stateUpdate(component, 'securePause');
    },

    addAttributes: function(component, event, helper) {
        helper.addAttributes(component);
    }
})