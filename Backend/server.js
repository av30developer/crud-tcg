const express=require('express');
const cors=require('cors');
var bodyParser = require('body-parser')
const PORT=process.env.PORT||5000;

const {sequelize} = require('./models');
const router=require('./router/userRoute')
const app=express();
app.use(bodyParser.json({ type: 'application/json' }))
app.use(cors());
// const jsonParser=express.json();

app.use("/user",router);
app.listen(PORT,async()=>{
    await sequelize.authenticate();
    console.log(`Server is running on port ${PORT}`)
})