import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
  text: String,
})

export default mongoose.model('Todo', TodoSchema)
