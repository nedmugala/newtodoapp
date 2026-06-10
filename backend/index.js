const express = require('express')
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json())

const notes = [
    {
        "title": "NEDDY",
        "content": "A Self made developer who came from nothing its All God's Grace",
        "id": "1",
        "important": false,
        "complete" : false
      },
    {
      "title": "HTML5",
      "content": "A Markup language for the front-end developer",
      "id": "Aah-OvVaYF4",
      "important": false,
      "complete" : false
    },
    {
      "id": "ZMfTL5hfgSA",
      "title": "CSS",
      "content": "A styling language for the front end developer",
      "important": false,
      "complete" : false
    },
    {
      "title": "JavaScript",
      "content": "A programming language for making web pages interactive",
      "id": "zAW0G1pPDSc",
      "important": false
      ,"complete":false
    }
  ]

app.get('/', (req,res)=>{
    res.send('<h1> Hello World </h1>')
})
app.get('/notes', (req,res)=>{
    res.json(notes);
})
app.get('/notes/:id', (req,res)=>{
    const id = req.params.id
    const note = notes.find(n=> n.id ===id)
    res.json(note)
})
app.post('/notes', (request, response)=>{
    const note = request.body
    notes.push(note)
    console.log(notes)
    console.log(note)
    response.json(note)
})

app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const updatedNote = req.body
    
    const index = notes.findIndex(note => note.id === id);
    notes[index] = updatedNote
    note = notes[index]

    

    if (!note) {
        return res.status(404).json({ error: 'Note not found' });
    }

    res.json(note);
})

app.put('/edit/notes/:id', (req, res) => {
    const id = req.params.id
    const updatedNote = req.body
    console.log(updatedNote);
    

    const index = notes.findIndex(note => note.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Note not found' });
    }

    notes[index] = updatedNote;

    res.json(updatedNote);
})

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    const index = notes.findIndex(note => note.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Note not found' });
    }

    notes.splice(index, 1);

    res.status(204).end();
});

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`app running on port http://localhost:${PORT}`)
})