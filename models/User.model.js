const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    idDocument: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: '/images/user/user-pic.jpeg'
    },
    phoneNumber: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date,
    },
    nationality: {
      type: String,
    },
    address: {
      addresInfo: {
        type: String,
      },
      province: {
        type: String,
      },
      city: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
    },
    emergencyNumber: {
      type: String
    },
    familyData: {
      members: {
        type: Number,
        default: 0
      },
      childs: {
        type: Boolean
      },
      handicapped: {
        type: Boolean
      },
      divorced: {
        type: Boolean
      },
      custody: {
        type: String,
        enum: ['Monoparental', 'Compartida', 'Partida', 'Ejercida por terceros', 'No aplica']
      }
    },
    previousReport: {
      socialServices: {
        type: Boolean
      },
      tracing: {
        type: Boolean
      },
      police: {
        type: Boolean
      },
      precautionaryMeasures: {
        type: Boolean
      },
    },
    employmentSituation: {
      type: String,
      enum: ['Empleada', 'Desempleada']
    },
    socialHelp: {
      benefits: {
        type: Boolean
      },
      supportSistem: {
        type: Boolean
      },
    },
    translator: {
      type: Boolean
    },
    role: {
      type: String,
      enum: ['USER', 'SOCIALWORKER', 'ADMIN'],
      default: 'USER'
    }
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema);

module.exports = User;
