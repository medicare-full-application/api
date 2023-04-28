const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    date: { type: Date, default: Date.now },
    content: { type: String, required: true },
    isActivate: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", NewsSchema);
