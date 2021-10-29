const express=require('express');
const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
const cors=require('cors');
require('dotenv').config()
const app=express();
app.use(cors());
app.use(express.json())
const port=process.env.PORT || 5000



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tjpkh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        
    }
    finally{
        // await client.close()
    }

}
run().catch(console.dir)



app.get('/',(req,res)=>{
    res.send('this is project')
})

app.listen(port,()=>{
    console.log('this is port number',port)
})