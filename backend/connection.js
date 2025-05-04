require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const url = process.env.DB_URL || 'mongodb://localhost:27017/autodocs';
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

connectDB();

module.exports = mongoose;