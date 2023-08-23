const { model, Schema } = require("mongoose");
const profile_doc = require("../../json/Docs/app@profile_doc.json");
module.exports = model("app@models", new Schema(profile_doc.Doc));
