const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "post"
  },
  image: {
    type: String
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profile"
  },
  handle: {
    type: String
  },
  leftX: {
    type: String
  },
  topY: {
    type: String
  }
});
module.exports = Tag = mongoose.model("tag", TagSchema);