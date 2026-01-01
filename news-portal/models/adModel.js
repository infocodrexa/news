const mongoose = require("mongoose");

const adSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true },
    redirectLink: { type: String, required: true },
    position: {
      type: String,
      enum: ["home", "sidebar", "footer", "modal"],
      default: "home",
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ad", adSchema);