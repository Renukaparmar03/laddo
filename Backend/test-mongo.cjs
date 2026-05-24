const mongoose = require('mongoose');

const uri1 = 'mongodb+srv://renuka:renuka@renuka.6fosl9i.mongodb.net/';
const uri2 = 'mongodb://renuka:renuka@ac-1msdgyi-shard-00-00.6fosl9i.mongodb.net:27017,ac-1msdgyi-shard-00-01.6fosl9i.mongodb.net:27017,ac-1msdgyi-shard-00-02.6fosl9i.mongodb.net:27017/?ssl=true&replicaSet=atlas-1msdgyi-shard-0&authSource=admin&retryWrites=true&w=majority';

async function test() {
  try {
    await mongoose.connect(uri2);
    console.log('Connected via uri2 (direct)');
    mongoose.disconnect();
  } catch (e) {
    console.error('Error with uri2:', e.message);
  }
}
test();
