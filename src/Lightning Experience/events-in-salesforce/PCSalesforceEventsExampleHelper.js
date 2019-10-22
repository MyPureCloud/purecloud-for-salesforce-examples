({
    statusUpdate : function(component, status) {
        var clientOrigin = component.get('v.clientOrigin'); 
        var source = component.get('v.postMessageSource');
        
        if(source) {
            source.postMessage({
                type: 'PureCloud.User.updateStatus',
                data: { id: status }, 
            }, clientOrigin);
        }
    },
    
    stateUpdate: function(component, action) {
        var clientOrigin = component.get('v.clientOrigin'); 
        var source = component.get('v.postMessageSource');
        var id = component.get('v.interactionId');
        
        if(source) {
            source.postMessage({
                type: 'PureCloud.Interaction.updateState',
                data: { action: action,
                        id: id
               }, 
            }, clientOrigin);
        }
    }
})