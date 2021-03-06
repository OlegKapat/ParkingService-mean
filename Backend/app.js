const express=require('express');
const app=express();
const mongoose=require('mongoose');
const passport=require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const userAuth=require('./routes/user/auth');
const managerAuth=require('./routes/manager/managerauth');
const parkingRoutes=require('./routes/manager/parking');
const applicationRoutes=require('./routes/user/application');
const rentRouter=require('./routes/user/rent');
const contactRouter=require('./routes/user/contact')
const config=require('./config/keys')

mongoose.connect(config.mongoURI,{useNewUrlParser: true}).then(()=>console.log("MongoDB подключена")).catch(error=>console.log(error));


app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads') )


app.use(require('cors')());
app.use(passport.initialize());
app.use(passport.session());
require('./middleware/passport')(passport);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth',userAuth);
app.use('/api/managerauth',managerAuth);
app.use('/api/admin',parkingRoutes);
app.use('/api/applicant',applicationRoutes);
app.use('/api/rent',rentRouter);
app.use('/api/contact',contactRouter)

if(process.env.NODE_ENV==='production'){
    app.use(express.static('/Frontend/parking/dist/parking'))
    app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'Frontend','parking','dist','parking','index.html'))
    })
}

module.exports=app;