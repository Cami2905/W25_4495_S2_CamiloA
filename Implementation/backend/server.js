const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const heroRoutes = require('./routes/heroRoutes');

const app = express();

app.use(express.json()); 
app.use(cors());


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/marvel_rivals';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB (Rivalytics database)'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));



app.use('/api/heroes', heroRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to the Marvel Rivals API!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});


