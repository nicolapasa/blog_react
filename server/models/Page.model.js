const { Schema, model } = require("mongoose");

const PageSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    typePage: {
      required: true,
      type: String,
      default: "single",
      enum: ["single", "contact", "gallery"],
    },
    content: {
      required: true,
      type: String,
    },
    picture: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Page = model("Page", PageSchema);

module.exports = Page;
