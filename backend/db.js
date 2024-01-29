const mongoose = require('mongoose')

const mongoURI = 'mongodb+srv://vishalmishra270799:vishal1234@cluster0.hbvhltf.mongodb.net/GoFoodMERN?retryWrites=true&w=majority';

const connectToMongo = async () => {
    await mongoose
        .connect(mongoURI)
        .then(async () => {
            console.log('MongoDB Atlas connected successfully');
            let fetched_data = mongoose.connection.db.collection("food_items");
            let foodCategory = mongoose.connection.db.collection("foodCategory");

            let data = await fetched_data.find({}).toArray();
            let catData = await foodCategory.find({}).toArray();

            global.food_items = data
            global.foodCategory = catData
        })
        .catch((err) => console.log("Mongo Error", err))
}

module.exports = connectToMongo;