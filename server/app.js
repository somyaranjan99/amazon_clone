const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe=require('stripe')('sk_test_51Mh5hgSCpGq4zLI30ZpeZVrxlgwCjvTn0r5thk7kWJAUnld5YxCkMNvTvISqZ1DIjmfUYUVKhnOOP6qntiFHQh5W00uIpYUFsU')
const app =express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin:true}));


app.post('/payment/create',async(req,res)=>{
    try {
        const total= Math.round(req.query.total) ;
    const payment_intent=  await stripe.paymentIntents.create({
        amount:total,
        currency: 'inr',
    });
    return res.json({
        "clientSecret":payment_intent.client_secret
    });
        
    } catch (error) {
        return res.json({'status':'sss'})
    }
})

app.listen(4001,()=>{
    console.log('app running')
})