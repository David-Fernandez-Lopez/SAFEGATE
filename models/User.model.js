const { text } = require("express");
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
      required: true,
      validate: {
        validator: function (elem) {
          
          let ref = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
          return (!elem || !elem.trim().length) || ref.test(elem)
        },
        message: 'La contraseña debe incluir al menos un dígito, una minúscula, una mayúscula y 8 caracteres'
      },
      minLength: 8
    },
    idDocument: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 9,
      maxLength: 9
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      default: '/images/user/user-pic.jpeg'
    },
    phoneNumber: {
      type: Number,
      minLength: 9,
      maxLength: 9,
      trim: true,
      required: true,
      unique: true
    },
    birthDate: {
      type: Date,
      required: true
    },
    nationality: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true
    },
    province: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zipCode: {
      type: Number,
      required: true
    },
    emergencyNumber: {
      type: Number,
      minLength: 9,
      maxLength: 9,
      trim: true,
      unique: true
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
        type:Boolean
      },
      custody: {
        type: String,
        enum: ['single parent', 'shared', 'split', 'third party']
      }
    },
    previousReports: {
      socialServices: {
        type: Boolean,
        tracing: {
          type:Boolean
        }
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
      enum: ['employed', 'unemployed']
    },
    socialHelps: {
      benefits: {
        type:Boolean
      },
      supportSistem: {
        type:Boolean
      },
    },
    translator: {
      type:Boolean
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
