import express from "express"
import mongoose from "mongoose";
import Cards from './dbCards.js'
import Cors from "cors"


//APP CONFIG
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:QmYEgf9D24HKhd2X@cluster0.f4tgh.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//middleware
app.use(express.json());
app.use(Cors());

//DB CONFIG
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})

//API ENDPOINTS
app.get('/',(req,res) => res.status(200).send("hello world"));

app.post("/tinder/cards",(req,res)=> {
    const dbCard = req.body;
    
    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards',(req,res)=>{
     Cards.find((err, data) => {
       if (err) {
         res.status(500).send(err);
       } else {
         res.status(200).send(data);
       }
     });
})

//LISTENER
app.listen(port,()=>console.log(`listening on local host ${port}`))





//ISERNAME:admin
//PASWORD:QmYEgf9D24HKhd2X