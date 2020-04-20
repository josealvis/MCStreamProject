export var storage = {
        appStates:{
            getComponentScope:function(componentName){
                if(this[componentName]== undefined) throw "Component is not bind";
                return this[componentName].scope;
            }
        },
        repos: [],
        getRepos: function () {
            return JSON.parse(JSON.stringify(this.repos));
        },
        setRepos: function (repos) {
            this.repos = repos;
        },
        //deprecated
        setComponetScope,
        bindComponentToStore: setComponetScope
    
};


function setComponetScope(componentName, scope){
    this.appStates[componentName]={scope};
 }