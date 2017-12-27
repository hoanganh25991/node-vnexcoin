const app = require("./dist/index")
const config = require("./config.json")
const {connect, loadDefaultModels} = require("./dist/mongodb/connect")

// Connect mongodb
const {mongodb: {database}} = config
connect(database)
loadDefaultModels()

// Start server
const port = process.env.PORT || 3000;
app.listen(port);
console.log('Magic happens on port ' + port);
