const express=require('express');
const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
const cors=require('cors');
require('dotenv').config()
const app=express();
app.use(cors());
app.use(express.json())
const port=process.env.PORT || 7000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tjpkh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();
        const database=client.db('bookingTour');
        const databaseCollection=database.collection('tour');
        const myOrderCollection=database.collection('myOrder');
        // console.log('database coonnected')

        
        //GET API\\
        app.get('/tour',async(req,res)=>{
            const cursor=databaseCollection.find({});
            const tourAll=await cursor.toArray();
            res.send(tourAll);
            console.log(tourAll);
        })

        //POST api\\
        app.post('/myOrder',async(req,res)=>{
            const myOrder=req.body;
            console.log('hit the post api',myOrder);
            const result=await myOrderCollection.insertOne(myOrder);
            console.log(result);
            res.json(result);
        });
        
        app.get('/myOrder',async(req,res)=>{
            const cursor=myOrderCollection.find({});
            const myOrder=await cursor.toArray();
            res.send(myOrder);
        });

        //tour post api
        app.post('/addedTour',(req,res)=>{
            const newTour=req.body;
            console.log('adding some',newTour)
            databaseCollection.insertOne(newTour).then((result)=>{
                 console.log('insertedCount',result.insertedCount);
                 res.send(result.insertedCount>0);
             });
            // console.log(result);
        })

        
    }
    finally{
        // await client.close()
    }

}
run().catch(console.dir)



app.get('/',(req,res)=>{
    res.send('this is project all of this')
})

app.listen(port,()=>{
    console.log('this is port number',port)
})