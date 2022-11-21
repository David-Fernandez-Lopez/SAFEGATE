const { Schema, model } = require("mongoose");
const issuesSchema = new Schema(
    {
        agression: {
            type: String,
            enum: ['verbal agression', 'physical agression', 'sexual assault'],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
           type: {
               type: String,
           }, 
           coordinates: [Number],
          // required: true,
        },
    },
    { 
        timestamps: true
    }
);

const Issues = model("Issues", issuesSchema);

module.exports = Issues;
