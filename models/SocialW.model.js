const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const socialWSchema = new Schema(
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
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const SocialW = model("SocialW", socialWSchema);

module.exports = SocialW;
