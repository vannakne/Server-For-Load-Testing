const express = require('express');
const cors = require('cors');
const app = express();

// // Enable CORS
// app.use(cors());

app.use(express.json())

// Define endpoints
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/hello', (req, res) => {
  res.send('Hello, world!');
});

app.post('/api/login', (req, res) => {
  // Simulate a database query
  const username = req.body.username;
  const password = req.body.password;
  if (username === 'admin' && password === 'password') {
    res.send('Logged in!');
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Simulate a database query
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

app.get('/api/users', (req, res) => {
  res.send(users);
});

app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = users.find(user => user.id === Number(userId));
  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.get('/api/compute', (req, res) => {
  // Simulate a long-running computation
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  res.send(`Result: ${result}`);
});

app.get('/api/compute/:count', (req, res) => {
  const count = Number(req.params.count);
  if (isNaN(count)) {
    res.status(400).send('Invalid count parameter');
    return;
  }
  let result = 0;
  for (let i = 0; i < count; i++) {
    result += i;
  }
  res.send(`Result: ${result}`);
});

app.put('/api/users/:id', (req, res) => {
  // Simulate a database update
  const id = req.params.id;
  const name = req.body.name;
  res.send(`Updated user ${id} with name ${name}`);
});

app.delete('/api/users/:id', (req, res) => {
  // Simulate a database delete
  const id = req.params.id;
  res.send(`Deleted user ${id}`);
});

// Start the server
const port = 3000;
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
