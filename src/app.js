import express from "express";
import mongoose from "mongoose";
import Product from "./models/product.model.js";
import { createClient } from "redis";
import generateCacheKey from "./utils/generateCacheKey.js";

const app = express();

// const redisClient = createClient();
// redisClient.on("error", (err) => {
// 	console.log("Error " + err);
// });
// redisClient.on("connect", () => {
// 	console.log("Redis client connected");
// });

// Connect to MongoDB
mongoose.connect(
	"mongodb+srv://admin:tushar@cluster0.bstsr.mongodb.net/redis-cashe",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

app.get("/api/v1/products", async (req, res) => {
	const query = {};
	// const key = generateCacheKey(req);

	// const cachedProducts = await redisClient.get(key);
	// if (cachedProducts) {
	// 	return res.json(JSON.parse(cachedProducts));
	// }

	if (req.query.category) {
		query.category = req.query.category;
	}

	const products = await Product.find(query);
	// if (products.length) {
	// 	await redisClient.set(key, JSON.stringify(products));
	// }
	res.json(products);
});

app.listen(4000, () => {
	console.log(`Server is running on http://localhost:4000`);
});
