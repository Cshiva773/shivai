import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await fetch(`http://localhost:8000?prompt=${encodeURIComponent(prompt)}`, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const imageData = await response.text();
    res.json({ photo: imageData });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while generating the image' });
  }
});

export default router;

