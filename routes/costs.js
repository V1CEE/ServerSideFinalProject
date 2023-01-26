const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://Shaked:shaked123@serversidecoursecluster.1hljluk.mongodb.net/Main', {useNewUrlParser: true});

// Define the Cost schema
const costSchema = new mongoose.Schema({
    user_id: {type: Number, required: true},
    year: {type: String, required: true},
    month: {type: String, required: true},
    day: {type: String, required: true},
    id: {type: mongoose.Types.ObjectId, required: true, default: mongoose.Types.ObjectId},
    description: {type: String, required: true},
    category: {type: String, required: true},
    sum: {type: Number, required: true}
});

// Create the Cost model
const Cost = mongoose.model('Cost', costSchema);

// POST request to add a new cost item
router.post('/', async (req, res) => {
    try {
        // Check if user with user_id already exists in the users collection
        const user = await mongoose.connection.db.collection('users').findOne({user_id: req.body.user_id});
        if(user){
            // Create a new cost item
            const newCost = new Cost({
                user_id: req.body.user_id,
                year: req.body.year,
                month: req.body.month,
                day: req.body.day,
                sum: req.body.sum,
                category: req.body.category,
                description: req.body.description
            });
            // Save the new cost item to the database
            await newCost.save();
            // Send a response
            res.json(newCost);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.json({ message: err });
    }
});

// GET request to test the costs router
router.get('', function(req, res) {
    res.send('<h1>This is costs page</h1>');
});

module.exports = router;
