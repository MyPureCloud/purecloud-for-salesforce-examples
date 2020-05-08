({
    sendMessage: function (component, message) {
        component.find('clientEventMessageChannel').publish(message);
    },
    statusUpdate : function(component, status) {
        this.sendMessage(component, {
            type: 'PureCloud.User.updateStatus',
            data: { id: status },
        });
    },

    stateUpdate: function(component, action) {
        var id = component.get('v.interactionId');        
        this.sendMessage(component, {
            type: 'PureCloud.Interaction.updateState',
            data: {
                action: action,
                id: id
            }
        });
    },

    outputToConsole: function(component, message) {
        if(message) {
            var console = component.get('v.consoleMessages');
            component.set('v.consoleMessages', console + message + " \r\n###");
        }
    },

    addAttributes: function(component) {

        var id = component.get('v.interactionId');
        var attributesText = component.get('v.attributes');
        var attributes = {};

        try{
            attributes = JSON.parse(attributesText);
        } catch(e){
            console.log('Error parsing custom attributes: ' + JSON.stringify(e.message));
        }

        this.sendMessage(component, {
            type: 'PureCloud.Interaction.addCustomAttributes',
            data: {
                attributes: attributes,
                id: id
            }
        });
    }
})