export var storage = {
        appStates:{
            getComponentScope:function(componentName){
                if(this[componentName]===undefined) throw new Error(`Component '${componentName}' is not bind.`);
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
        setComponentScope,
        bindComponentToStorage: setComponentScope
    
};


function setComponentScope(componentName, scope){
    this.appStates[componentName]={scope};
 }