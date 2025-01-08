import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Product } from "/models/product";

// Connect to MongoDB

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "sample_mflix",
    });
    console.log("db conneted");
    // Clear existing data
    // await Product.deleteMany({});
    // console.log('Existing products deleted.');

    // Generate fake products
    const products = Array.from({ length: 50 }, () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
      category: faker.commerce.department(),
      image: faker.image.urlPicsumPhotos({}),
      stock: faker.number.int({ min: 0, max: 100 }),
    }));

    // Insert into database
    await Product.insertMany(products);
    console.log("Database seeded with fake products.");

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
