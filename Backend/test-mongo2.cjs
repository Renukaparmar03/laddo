const mongoose = require('mongoose');

const uri1 = 'mongodb+srv://renuka:renuka@renuka.6fosl9i.mongodb.net/';

async function test() {
  try {
    await mongoose.connect(uri1, { family: 4 });
    console.log('Connected via uri1 (family: 4)');
    mongoose.disconnect();
  } catch (e) {
    console.error('Error with uri1:', e.message);
  }
}
test();
