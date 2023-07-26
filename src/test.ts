import mongoose from 'mongoose';

async function deleteDatabase() {
  try {
    // Replace 'mongodb://localhost/your_database_name' with your actual MongoDB connection string and database name.
    const dbUri = 'mongodb://localhost/nestjs_app';
    
    // Connect to MongoDB
    await mongoose.connect(dbUri, { });
    
    // Get a list of all collections in the database
    const collections = mongoose.connection.collections;
    
    // Delete all documents from each collection
    for (const collectionName in collections) {
      const collection = collections[collectionName];
      await collection.deleteMany({});
    }
    
    // Close the MongoDB connection
    await mongoose.disconnect();

    console.log('Database cleared successfully.');
  } catch (error) {
    console.error('Error while clearing the database:', error);
  }
}

// Call the deleteDatabase function
deleteDatabase();
