export var storage = {
    repos: [],
    
    getRepos: function(){
        return JSON.parse(JSON.stringify(this.repos));
    },
    setRepos: function(repos){
        this.repos =  repos;
    } 

};