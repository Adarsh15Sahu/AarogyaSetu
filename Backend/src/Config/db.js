const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    }
    catch (err) {
        console.log("Database connection Error", err);
        process.exit(1);
    }
}

module.exports = connectDatabase;