const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const mongoConnect = async () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: "majority",
  }).then(
    () => {
      console.info(`Connected to mongo!`)
    }
  )
    .catch((error) => {
      throw new Error(error);
    });
}

export { mongoConnect };
