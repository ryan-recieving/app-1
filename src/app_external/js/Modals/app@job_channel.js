const { model, Schema } = require("mongoose");
const job_channel_doc = require("../../json/Docs/app@job_channel.json");

module.exports = model("app@job_channels", new Schema(job_channel_doc.Doc));
