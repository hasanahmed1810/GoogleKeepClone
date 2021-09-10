const express =  require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect("mongodb://localhost:27017/notesDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
})

const Note = mongoose.model("Notes", noteSchema)

app.get('/notes', (req, res) => {
    Note.find((err, notes) => {
        res.send(notes)
    })
    
})

app.post('/notes', (req, res) => {
    const note = req.body
    Note.create(note)
    res.status(201).send('note created')
})

app.delete('/notes', (req, res) => {
    const id = req.body._id

    Note.findByIdAndRemove(id, function (err) {
        res.status(200).send('note deleted')
    })
})

app.listen(4000)