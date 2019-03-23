const mongoose = require('mongoose');

const config = require('./config');

const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');


mongoose.connect(config.db.url + '/' + config.db.name);


const db = mongoose.connection;

db.once('open', async () => {
   try{
       await db.dropCollection('users');
       await db.dropCollection('products');
       await db.dropCollection('categories');
   }
   catch (e) {
       console.log('Collections where not present, skipping drop...');
   }

   console.log('Collection is dropped');

   const [user, admin] = await User.create({
       username: 'test',
       password: 'test',
       displayname: 'Test User',
       phone: '+996555005500',
       role: 'user'
   },{
       username: 'admin',
       password: 'admin',
       displayname: 'God',
       phone: '+996555000000',
       role: 'admin'
   });

    console.log('User created');

    const [cpus, gpus, monitors, other] = await Category.create({
        title: 'CPUs',
        description: "Here is description for CPUs"
    },
    {
        title: 'GPUs',
        description: "Here is description for GPUs"
    },
    {
        title: 'Monitors',
        description: "Here is description for Monitors"
    },
    {
        title: 'Other',
        description: "Here is description for Other"
    });

    console.log('Category created');

    const [GTX2080, GTX2080Ti, corei9, corei7] = await Product.create(
        {
            name: "gtx 2080",
            price: 1000,
            description: "powerful GPU",
            image: "",
            category: gpus._id,
            userId: user._id
        }, {
            name: 'GTX 2080Ti',
            price: 1200,
            description: 'top gpu',
            image: '',
            category: gpus._id,
            userId: admin._id
        }, {
            name: 'Core i 9',
            price: 700,
            description: 'top cpu',
            image: '',
            category: cpus._id,
            userId: admin._id
        }, {
            name: 'Samsung LCD 17 inch',
            price: 600,
            description: 'best quality',
            image: '',
            category: monitors._id,
            userId: admin._id
        }, {
            name: 'Mouse A4tech',
            price: 600,
            description: 'best choise',
            image: '',
            category: other._id,
            userId: user._id
        }
    );

    console.log('Products created');
    db.close();


});