import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Routes

// Create a new user
app.post('/users', async (req, res) => {
    const { first_name, last_name, email, phone_number, password_hash, user_type } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                phone_number,
                password_hash,
                user_type,
            },
        });
        res.status(201).json(user);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new property
app.post('/properties', async (req, res) => {
    const { user_id, title, description, location, area, bedrooms, bathrooms, amenities, price } = req.body;
    try {
        const property = await prisma.property.create({
            data: {
                user_id,
                title,
                description,
                location,
                area,
                bedrooms,
                bathrooms,
                amenities,
                price,
            },
        });
        res.status(201).json(property);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

// Get all properties
app.get('/properties', async (req, res) => {
    try {
        const properties = await prisma.property.findMany();
        res.status(200).json(properties);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

// Mark interest in a property
app.post('/interests', async (req, res) => {
    const { buyer_id, property_id } = req.body;
    try {
        const interest = await prisma.interested.create({
            data: {
                buyer_id,
                property_id,
            },
        });
        res.status(201).json(interest);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

// Like a property
app.post('/likes', async (req, res) => {
    const { user_id, property_id } = req.body;
    try {
        const like = await prisma.like.create({
            data: {
                user_id,
                property_id,
            },
        });
        res.status(201).json(like);
    } catch (error:any) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
