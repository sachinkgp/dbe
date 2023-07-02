const express = require("express");
const app = express();
var mongoose = require('mongoose');
const PORT = 8000

//negiiitkgp
//mpkivvACCY7j4qRn

const MONGOURI = "mongodb+srv://negiiitkgp:mpkivvACCY7j4qRn@cluster0.fphlp3n.mongodb.net/?retryWrites=true&w=majority"

//const password = "QWnpUArGYGmtKI4D"
mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

mongoose.connection.on('connected', () => {
    console.log("connected to mongoose yeahhhhhh......")
})


require('./dataschemas/orderSchema')
require('./dataschemas/userSchema')

app.use(express.json())
app.use(require('./routes/authentication.js'))
app.use(require('./routes/order.js'))


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

app.get('/',(req, res) =>{
    res.send('Hello Sir')
})