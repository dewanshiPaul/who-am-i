const mongoose = require("mongoose");

const uri = "" //your uri to the cluster in atlas

const connectDB = async () => {
    try {
        mongoose.set({
            strictQuery: true
        });
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connect to db");
    } catch(err) {
        console.error(err);
    }
};

module.exports = connectDB;