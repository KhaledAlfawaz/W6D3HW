import express,{ Request , Response , Application  } from "express"
const app:Application = express()
const port = 3000

interface Data {
    name:string,
    age:number
}


import data from './data.json'


app.use(express.json())

// using API
app.get('/', (req : Request, res:Response) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => res.send(json))
})

// CRUD


// READE

app.get('/users' , (req:Request , res:Response) => {
    res.send(data)
})

// DELETE

app.delete('/users', (req : Request, res:Response) => {
    const name = req.body.name
    res.json(data.filter((e:Data)  => e.name !== name))
})

// CREATE

app.post('/users', (req : Request, res:Response) => {
    if(req.body.name === undefined || req.body.age === undefined){
        res.send('please enter a name and age').end()
    } else {
        const name = req.body.name
        const age = req.body.age
        const obj = {
            name:name,
            age:age
        }
        data.push(obj)
        res.send(data)
    }
})

// UPDATE

app.put('/users' , (req : Request, res:Response)=> {
    if (req.body.age === undefined){
        res.send('please enter the new age')
    } else {
        data.find((e:Data) => {
            if (e.name === req.body.name ) {
                e.age = req.body.age
            } 
        })
        res.json(data)
    }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})