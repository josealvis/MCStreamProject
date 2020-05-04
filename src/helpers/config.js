
class config {
   
    constructor(){
        this.host ='';
        this.localHost ='http://localhost:4000';
        this.prodHost ='http://10.0.0.2:4000';
    }

    getHostName(){
        if(process.env.NODE_ENV === 'production'){
            return this.prodHost;
        }else return this.localHost;
    }

}


export default new  config();