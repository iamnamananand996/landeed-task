import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Ajv, { JSONSchemaType } from 'ajv';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config = require('./config.json');

const ajv = new Ajv();

const generateValidationSchema = (config: any) => {
  const pagesSchemas = config.pages.map((page: any) => ({
    type: 'object',
    properties: page.properties,
    required: page.required || [],
  }));
  return {
    type: 'object',
    properties: pagesSchemas.reduce(
      (acc: any, pageSchema: any) => ({ ...acc, ...pageSchema.properties }),
      {}
    ),
    required: pagesSchemas.reduce(
      (acc: string[], pageSchema: any) => [...acc, ...pageSchema.required],
      []
    ),
  };
};

const validationSchema = generateValidationSchema(config);

const validate = ajv.compile(validationSchema);

app.get('/api/config', (req, res) => {
  res.json(config);
});

app.post('/api/submit', (req, res) => {
  const { body } = req;

  const valid = validate(body);

  if (!valid) {
    return res.status(400).json({ errors: validate.errors });
  }

  res.status(200).send('Submission received');
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
