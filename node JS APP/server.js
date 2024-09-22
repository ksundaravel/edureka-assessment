const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

const url = 'mongodb+srv://sundaravelmca:Sundar@30*@cluster0.o9wmeas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'sales';
let db;

// Connect to MongoDB
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  db = client.db(dbName);
  console.log(`Connected to database: ${dbName}`);
  
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});

// CRUD routes
app.post('/api/collection', async (req, res) => {
  const collection = db.collection('mongodbVSCodePlaygroundDB.sales');
  const document = req.body;
  try {
    const result = await collection.insertOne(document);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/collection', async (req, res) => {
  const collection = db.collection('your_collection');
  try {
    const documents = await collection.find({}).toArray();
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/collection/:id', async (req, res) => {
  const collection = db.collection('your_collection');
  const id = req.params.id;
  try {
    const document = await collection.findOne({ _id: new ObjectId(id) });
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/collection/:id', async (req, res) => {
  const collection = db.collection('your_collection');
  const id = req.params.id;
  const updates = req.body;
  try {
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'Document updated' });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/collection/:id', async (req, res) => {
  const collection = db.collection('your_collection');
  const id = req.params.id;
  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Document deleted' });
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
