// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const userRoute = require('./routes/user'); // Adjust path as needed
// const homeworkRoute = require("./routes/homework"); // Adjust path as needed

// const app = express();
// const PORT = 3500;

// // Middleware
// app.use(express.json());
// app.use(cors());
// dotenv.config();

// // MongoDB Connection
// async function dbConnect() {
//     try {
//         await mongoose.connect(process.env.MONGOOSE_URI);
//         console.log('Db Connected Successfully!!!');
//     } catch (err) {
//         console.log(`db Connection error ${err.message}`);
//     }
// }

// dbConnect();

// // Routes
// app.get('/', (req, res) => {
//     res.send("<h1>Hello let's start building the application</h1>");
// });

// app.use('/user', userRoute); // Mount user routes
// app.use('/homework', homeworkRoute); // Mount homework routes

// // Server
// app.listen(PORT, () => {
//     console.log(`Server started listening at ${PORT}`);
// });

// module.exports = app;


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/user'); // Adjust path as needed
const homeworkRoute = require("./routes/homework"); // Adjust path as needed

const app = express();
const PORT = 3500;

// Middleware
app.use(express.json());
app.use(cors());
dotenv.config();

// MongoDB Connection
async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log('Db Connected Successfully!!!');
    } catch (err) {
        console.log(`db Connection error ${err.message}`);
    }
}

dbConnect();

// Routes
app.get('/', (req, res) => {
    res.send("<h1>Hello let's start building the application</h1>");
});

app.use('/user', userRoute); // Mount user routes
app.use('/homework', homeworkRoute); // Mount homework routes

// Start the server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server started listening at ${PORT}`);
    });
}

module.exports = app;
