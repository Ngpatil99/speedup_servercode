import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import connectDB from "../server/config/db.js";
import blogModel from "../server/models/blogModel.js";
import careerModel from "../server/models/careerModel.js";


// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const start = async () => {
    try {
        await connectDB(process.env.Mongo_URL);

        // Read JSON file
        const blogJsonPath = join(__dirname, 'Blog.json');
        const careerJsonPath = join(__dirname,'Career.json')
        const blogData = JSON.parse(readFileSync(blogJsonPath, 'utf-8'));
        const CareerData = JSON.parse(readFileSync(careerJsonPath, 'utf-8'));


        // Create documents in the database
        await blogModel.create(blogData);
        await careerModel.create(CareerData);

        console.log('Success');
    } catch (error) {
        console.error(error);
    }
};

start();
