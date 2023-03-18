import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    supplierName: String,
    address: String,
    phoneNumber: String,
  },
  { strict: false }
);

module.exports =
  mongoose.models.supplier || mongoose.model("supplier", articleSchema);
