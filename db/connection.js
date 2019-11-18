const mongoose = require("mongoose");
const { dbPass } = require("../config/security");

mongoose.set("useFindAndModify", false);

const connection = mongoose
  .connect(
    `mongodb+srv://gamerAppDb:${dbPass}@cluster0-aikk5.mongodb.net/gamer?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.log(err);
    process.exit();
  });

module.exports = {
  connection
};
