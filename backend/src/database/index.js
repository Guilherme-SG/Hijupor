const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true  })
mongoose.Promise = global.Promise

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database")
});

module.exports = mongoose