const mongoose = require('mongoose');

const = { Schema } = mongoose;
const userSchema = new Schema ({
  name: {
      type: String,
      required: true,
      unique: ture,
  },
  age: {
      type: Number,
      required: true,
  },
  married: {
      type: Boolean,
      required: true,
  },
  comment: String,
  
})