import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

const app = express();
dotenv.config()
const port = process.env.PORT || 3000;

// Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define link schema and model
const linkSchema = new mongoose.Schema({
  shortCode: String,
  originalURL: String,
});
const Link = mongoose.model('Link', linkSchema);

// Define routes
app.get('/', (req, res) => {
  res.send('Hello there. I am running fine...');
});

app.get('/short/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Original URL parameter missing');
  }

  // Check if the short code already exists
  const existingLink = await Link.findOne({ shortCode });

  if (existingLink) {
    res.status(400).send(`Short code ${shortCode} already exists.`);
    return;
  }

  // Create new link document
  const newLink = new Link({ shortCode, originalURL:url });

  // Save link to database
  await newLink.save();

  res.send(`Short code ${shortCode} created for ${url}`);
});

app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  // Find link with matching short code
  const link = await Link.findOne({ shortCode });

  if (!link) {
    res.status(404).send(`Short code ${shortCode} not found`);
    return;
  }

  // Redirect to original URL
  res.redirect(link.originalURL);
});

// Start server
app.listen(port, () => {
  console.log(`Link shortener backend listening at http://localhost:${port}`);
});
