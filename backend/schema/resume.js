const mongoose = require("mongoose");

const pdfSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    }, 
    pdf: {
        type: Buffer,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model("Pdf", pdfSchema);