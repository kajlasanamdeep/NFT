// initalizing modules
const path = require('path');
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');


// importing constants
const app = express();
const Routes = require('./Routes');
const { APP_CONSTANTS } = require('./Config');
const DB = require('./Lib/Database');
const swaggerJson = require('./swagger.json');
const origins = [
    'http://localhost:3000'
]
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin) return callback(null, true);
//         if (origins.indexOf(origin) === -1) {
//             let msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     },
//     optionsSuccessStatus: 200
// };

// initalizing Apis
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/Images', express.static(path.join(__dirname, './Uploads')));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use('/api', Routes);

// connecting Database
DB.connect().then((connected) => {

    console.log(connected);

    // starting Server
    app.listen(process.env.PORT || APP_CONSTANTS.SERVER.PORT, (error) => {

        if (error) throw error;

        else console.log(`⚡️[server]: Server is running at http://localhost:${APP_CONSTANTS.SERVER.PORT}`);
    });

}).catch((error) => {

    console.log("Database Connection Error:", error);

});