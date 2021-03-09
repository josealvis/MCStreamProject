//TODO: refactor this storage aproach
export var storage = {
    appStates: {
        getComponentScope: function (componentName) {
            if (this[componentName] === undefined) throw new Error(`Component '${componentName}' is not bind.`);
            return this[componentName].scope;
        }
    },
    nsfwMode: false,
    repos: [],
    getRepos: function () {
        let repo = JSON.parse(JSON.stringify(this.repos));
        repo = repo.filter(e => this.nsfwMode || !e.nsfw)
        repo =repo.map(el => {
            el.media = el.media.filter(e => this.nsfwMode || !e.nsfw);
            return el;
        })

        return repo;
    },
    setRepos: function (repos) {
        this.repos = repos;
    },
    //deprecated
    setComponentScope,
    bindComponentToStorage: setComponentScope
};


function setComponentScope(componentName, scope) {
    this.appStates[componentName] = { scope };
}