const meetupApp = require('./models/events.models')
const  { dbConnect} = require('./db/db.connect')
dbConnect()
const express = require("express")
const app = express()
app.use(express.json())
const PORT = process.env.PORT  || 3000


const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

async  function postdata(data){
 
    try{
        if(data.name && data.eventType && data.eventUrl && data.eventStart  && data.eventEnd && data.hostedBy && data.details && data.dressCode && data.age && data.eventTags  && data.venue && data.price && data.speakers){
            const newData =  new meetupApp(data)
            const saveData = await newData.save()
             return saveData

        }else{
             console.log("some field are missing ")
             
        }
        
  

    }catch(error){
        console.log("error ocurred : " , error)
    }


}

app.post('/meetup' , async (req,res)=>{
    const data = await postdata(req.body)
    try{

         if(data){
        res.status(201).json({message : "data added successfully . " , data : data} )
    }
    }catch(error){
        res.status(500).json({error :"failed to add meetupdata"})

    }
   
})

async function getAllData(){
    try {
         const data = await meetupApp.find()
         return data 
    } catch (error) {
         throw error
    }
    
}


app.get("/meetup" , async(req,res)=>{
    try{ 
     
         const data  = await getAllData()
            if(data.length > 0){
                 res.send(data)
            }
        

    }catch(error){
        throw error

    }
   
})


// Get one meetup by ID
async function getByIdData(id) {
    try {
        const data = await meetupApp.findById(id)
        return data
    } catch (error) {
        throw error
    }
}

app.get("/meetup/:id", async (req, res) => {
    try {
        const id = req.params.id
        const data = await getByIdData(id)

        if (data) {
            res.status(200).json(data)
        } else {
            res.status(404).json({ message: "Meetup not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch meetup by ID" })
    }
})



app.listen(PORT , ()=>{
    console.log(`server is listining on port : http://localhost:${PORT}/`)
})