const { Schema, model } = require("mongoose");
const foroSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Foro = model("Foro", foroSchema);

module.exports = Foro;
