import express from 'express';
const app = express();
const PORT = 5000;

const items = [];

let currentId = 1;

app.use(express.json());

app.post('/items', (req, res) =>{
  const {name, quantity, type} = req.body;

 if (typeof name !== "string" || typeof type !== "string") {
  return res.status(400).json({ error: "Por favor, somente letras e espaço para escrever o nome e tipo de item." });
}

if (!Number.isInteger(quantity)) {
  return res.status(400).json({ error: "Por favor, somente números ao declarar a quantidade que gostaria." });
}

const itemExists = items.find((item) => item.name === name);
  if (itemExists) {
    return res.status(409).json({ error: "Este item já está na lista." });
  }

const novoitem = {
  id: currentId++,
  name, 
  quantity, 
  type
 }

 items.push(novoitem);

  res.status(201).json({
    item: novoitem,
  });
})

app.get('/items', (req, res) =>{
  const { type } = req.query;

  if (type) {
    const filteredItems = items.filter(item => item.type.toLowerCase() === type.toLowerCase());
    return res.status(200).json(filteredItems);
  }

  res.status(200).json(items);

});


app.get('/items/:id', (req, res) =>{
  const id = req.params.id
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });