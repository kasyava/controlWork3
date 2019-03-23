
const express = require("express");
const app = express();


const cors = require("cors");
const mongoose = require('mongoose');
const expressWs = require('express-ws')(app);


const product = require("./app/product");
const categories = require("./app/categories");
const users = require("./app/users");

const config =  require("./config");

const port = 8000;



mongoose.set('useCreateIndex', true);
mongoose.connect(config.db.url + '/' + config.db.name, {useNewUrlParser: true });
const db = mongoose.connection;


app.use(cors());
app.use(express.static('public'));
app.use(express.json());


const activeConnections = [];

db.once('open', () => {
    app.use('/products', product);
    app.use('/categories', categories());
    app.use('/users', users());
    app.ws('/chat', function (ws, req) {
        console.log('Websocket is started');
        activeConnections.push(ws);

        const activeConnectionIndex = activeConnections.length-1;


        ws.on('close', (msg) =>{
            console.log('client disconnected ' + activeConnectionIndex);
            activeConnections.splice(activeConnectionIndex, 1);
        });

        let username = '';

        ws.on('message', (msg) => {
            const decodedMessage = JSON.parse(msg);
            switch (decodedMessage.type) {
                case 'SET_USERNAME':
                    username = decodedMessage.username;
                    break;
                case 'CREATE_MESSAGE':
                    console.log(decodedMessage);
                    const message = JSON.stringify({
                        type: 'NEW_MESSAGE',
                        message: {
                            username: decodedMessage.username,
                            text: decodedMessage.text
                        }
                    });
                    activeConnections.forEach(connection => {
                        connection.send(message);
                    });
                    break;


                default:
                    console.log('Unknown message type:', decodedMessage.type);
            }


            console.log(username);
        });


    });
    app.listen(port, () => console.log(`Server started on ${port}`));
});





