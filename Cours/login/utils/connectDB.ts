import mongoose from 'mongoose'

export function connectDB() {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PWD}@cluster0.3w9flsd.mongodb.net/?retryWrites=true&w=majority`,
    )
    .then(() => {
      console.log('connecté à mongo DB')
    })
    .catch((err) => {
      console.log(`Erreur de connection à la base de donnée`)
      console.log(err)
    })
}
