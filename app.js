const mongoose = require('mongoose');
const express = require('express');
const body = require('body-parser'); 
const productCompanyRouter = require('./Routers/productRouter/productCompanyRoute');
const productDealerRouter = require('./Routers/productRouter/productDealerRoute');
const dealerCartRouter = require('./Routers/productRouter/dealerCartRoute');
const shopkeeperCartRouter = require('./Routers/productRouter/shopkeeperCartRoute');
const representativeCartRouter = require('./Routers/productRouter/representativeCartRoute');
const totalDealerRouter = require('./Routers/productRouter/totalDealerRoute');
const totalShopkeeperRouter = require('./Routers/productRouter/totalShopkeeperRoute');
const dealerListRouter = require("./Routers/userRouter/adminDealerRoute");
const shopkeeperListRouter = require("./userRouter/adminShopkeeperRoute");
const representativeListRouter = require("./Routers/userRouter/adminRepresentativeRoute");
const representativeShopkeeperListRouter = require("./Routers/userRouter/representativeShopkeeperRoute");
const representativeImageRouter = require("./Routers/representativeImageRouter/representativeImageRoute");
const representativeVisitDetailsRouter = require("./Routers/productRouter/representativeVisitDetailsRoute");
const adminRouter = require("./Routers/loginRouter/adminRoute");
const dealerRouter = require("./Routers/loginRouter/dealerRoute");
const shopkeeperRouter = require("./Routers/loginRouter/shopkeeperRoute");
const representativeRouter = require("./Routers/loginRouter/representativeRoute");

require('dotenv').config();

const app = express();
const PORT = process.env.API_PORT;

app.use(morgan("dev"));
app.use('/uploads' , express.static('uploads'));
app.use(body.urlencoded({extended : false}));
app.use(body.json());

app.use((req , res , next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods" , "PUT , POST , PATCH , DELETE , GET");
        return res.status(200).json({});
    }
    next();
});


app.use('/productCompanyList' , productCompanyRouter);
app.use('/productDealerList' , productDealerRouter);
app.use('/dealerCart' , dealerCartRouter);
app.use('/representativeCart' , representativeCartRouter);
app.use('/shopkeeperCart' , shopkeeperCartRouter);
app.use('/totalAmountDealer' , totalDealerRouter);
app.use('/totalAmountShopkeeper' , totalShopkeeperRouter);
app.use('/dealerList' , dealerListRouter);
app.use('/shopkeeperList' , shopkeeperListRouter);
app.use('/representativeList' , representativeListRouter);
app.use('/representativeShopkeeperList' , representativeShopkeeperListRouter);
app.use('/representativeImageCollector' , representativeImageRouter);
app.use('/representativeVisitDetails' , representativeVisitDetailsRouter);
app.use('/admin' , adminRouter);
app.use('/dealer' , dealerRouter);
app.use('/shopkeeper' , shopkeeperRouter);
app.use('/representative' , representativeRouter);


const db = mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
    process.exit(1);
  });

app.use((req , res , next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req , res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});


app.listen(PORT , () => {
    console.log("Connection is being established at " + PORT);
})
