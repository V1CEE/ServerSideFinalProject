const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://Shaked:shaked123@serversidecoursecluster.1hljluk.mongodb.net/Main', {useNewUrlParser: true});

// GET request to get a detailed report for a specific month and year, filtered by user_id
router.get('/', async (req, res) => {
    try {
        // Check if user with user_id exists in the users collection
        const user = await mongoose.connection.db.collection('users').findOne({user_id: Number(req.query.user_id)});
        if(user) {
            // Get the costs for the specific month and year, filtered by user_id
            const costs = await mongoose.connection.db.collection('costs').find({
                user_id: Number(req.query.user_id),
                month: req.query.month,
                year: req.query.year
            }).toArray();

                // Group the costs by category
                const groupedCosts = {
                    "food": [],
                    "health": [],
                    "housing": [],
                    "sport": [],
                    "education": [],
                    "transportation": [],
                    "other": []
                };

                costs.forEach(cost => {
                    if (groupedCosts[cost.category]) {
                        groupedCosts[cost.category].push({day: cost.day, description: cost.description, sum: cost.sum});
                    }
                });

                Object.entries(groupedCosts).forEach(([key, value]) => {
                        if (value[0]) {
                            res.write(`${key}: ${JSON.stringify(value[0])}`);
                            res.write('\n');
                        } else {
                            res.write(`${key}: []`);
                            res.write('\n');
                        }

                    }
                );
                res.end();


            } else {
                res.status(404).end("<h1> user is not found </h1>");
            }

    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
