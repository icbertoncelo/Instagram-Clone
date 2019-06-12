const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true
    },
    place: String,
    description: String,
    hashtags: String,
    image: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Post', PostSchema)
