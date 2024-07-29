import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = require('./config.json');

app.get('/api/config', (req, res) => {
  res.json(config);
});

app.post('/api/submit', (req, res) => {
  const { body } = req;

  // Validate and process the submission data here
  console.log(body);
  res.status(200).send('Submission received');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
