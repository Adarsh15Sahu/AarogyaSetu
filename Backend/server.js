require('dotenv').config();
const express = require('express');
const connectDatabase = require('./src/Config/db');
const cors = require('cors');
const patientRoutes  = require('./src/Routes/patientRoutes');
const doctorRoutes = require('./src/Routes/doctorRoutes');
const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

app.use('/api/patient', patientRoutes);
app.use('/api/doctor', doctorRoutes);


app.listen(process.env.REACT_APP_PORT, () => {
    console.log("Server is running on Port", process.env.REACT_APP_PORT);
})
