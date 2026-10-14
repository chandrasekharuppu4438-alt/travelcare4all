const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const testConnection = async () => {
  const uri = process.env.MONGODB_URI;
  console.log('\n--- Testing MongoDB Connection ---');
  console.log('URI configured in .env:', uri ? uri.replace(/:([^@]+)@/, ':****@') : '(none)');

  if (!uri || uri.includes('<db_username>')) {
    console.error('\n❌ ERROR: Your MONGODB_URI still contains the placeholder "<db_username>".');
    console.error('👉 Please replace "<db_username>" in backend/.env with your actual MongoDB Atlas database username.');
    console.error('   Example: mongodb+srv://myUsername:Travelcare4all2004@travelcare4all.5uwf1eb.mongodb.net/travelcare4all?retryWrites=true&w=majority&appName=Travelcare4all\n');
    process.exit(1);
  }

  try {
    console.log('Attempting connection to MongoDB Atlas...');
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });
    let displayHost = conn.connection.host;
    try {
      const match = uri.match(/@([^/?]+)/);
      if (match && match[1]) displayHost = match[1];
    } catch {}
    console.log(`\n✅ Connected successfully to: ${displayHost}`);
    console.log(`✅ Database name: ${conn.connection.name}`);
    console.log('--- Connection Test Passed! ---\n');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Connection failed:');
    console.error(error.message);
    if (error.message.includes('Authentication failed') || error.code === 8000) {
      console.error('\n👉 Authentication failed. Please verify that:');
      console.error('   1. The database username is correct in your MongoDB Atlas -> "Database Access" panel.');
      console.error('   2. The password is correct and has the required permissions (readWriteAnyDatabase or dbAdmin).');
    } else if (error.message.includes('whitelist') || error.message.includes('serverSelectionTimeoutMS')) {
      console.error('\n👉 Network timeout / IP whitelist issue:');
      console.error('   1. Go to MongoDB Atlas -> Network Access -> IP Access List.');
      console.error('   2. Ensure "0.0.0.0/0" (Allow Access from Anywhere) or your current IP is added.');
    }
    process.exit(1);
  }
};

testConnection();
