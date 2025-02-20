require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json()); 
app.use(cors());

// Import routes
const heroRoutes = require('./routes/heroRoutes');
app.use('/api/heroes', heroRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB Connection Error:', err));

