const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    equipmentName: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    availableQuantity: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["Available", "Unavailable", "Maintenance"],
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Equipment",
  equipmentSchema
);