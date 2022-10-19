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
    },
    
    eventSubscribe: function(component) {
        var subscriptionType = component.get('v.subscriptionType');
        var subscriptionCategories = component.get('v.subscriptionCategories');
        var categories = subscriptionCategories.split(',');
        this.sendMessage(component, {
            type: 'PureCloud.Subscribe',
            data: {
                type: subscriptionType, 
                categories: categories 
            }
        });
    },
    
    addAssociation: function(component) {
        var id = component.get('v.interactionId');
        var associationText = component.get('v.association');
        var association = {};
        try{
            association = JSON.parse(associationText);
        } catch(e){
            console.log('Error parsing association: ' + JSON.stringify(e.message));
        }
        this.sendMessage(component, {
            type: 'PureCloud.Interaction.addAssociation',
            data: {
                interactionId: id,
                id: association.objectId,
                type: association.type,
                text: association.text
            }
        });
    }
})