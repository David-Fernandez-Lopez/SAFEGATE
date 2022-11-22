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
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Issue = model("Issues", issuesSchema);

module.exports = Issue;
