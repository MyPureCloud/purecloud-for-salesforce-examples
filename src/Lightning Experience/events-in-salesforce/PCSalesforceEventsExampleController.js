({
    onClientEvent: function (component, message, helper) {
        var eventData = message.getParams();
        if (eventData) {
            var message = JSON.stringify(eventData);
            helper.outputToConsole(component, message);
            if(eventData.type === 'Interaction' && eventData.data.id) {
                component.set("v.interactionId", eventData.data.id );
            }
        }
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