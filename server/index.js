// MongoDB

const mongoose = require("mongoose");
const app = require("./app");

const {
    DB_USER, 
    DB_PASSWORD, 
    DB_HOST,
    API_VERSION,
    IP_SERVER   
} = require("./constants");

const port = process.env.POST || 3977;

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`, (error) => {
        if(error) throw error;

        app.listen(port, () => {
            console.log("----------------------------");
            console.log("-------# API REST #--------");
            console.log("----------------------------");
            console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`);
        });
    }
)