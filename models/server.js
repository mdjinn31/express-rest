const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');


class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.paths = [
            '/api/user',
            '/api/sessions'
        ];

        //conecto to db
        this.connecto2DB();

        //Middlewares
        this.middlewares();

        //rutas de applicacaoin
        this.routes();
    }

    async connecto2DB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        // body parsse
        this.app.use( express.json());

        // Public Folder
        this.app.use(express.static('public'));
    }

    routes(){
        
        this.app.use(this.paths[0],require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () => {console.log(`Running on port ${this.port}`)});
    }
}

module.exports = Server;