const mongoose = require('mongoose');
const User = require('./models/user');

const users = [
    'jorgitooo',
    'Carlos123',
    'Ckari',
    'marquito',
    'maria.lamejor',
    'estebanQuito',
    'mono',
    'anónimo',
    'carla',
    'sergio-caceres',
];

mongoose
    .connect('mongodb://127.0.0.1:27017/prode')
    .then(() => {
        console.log('Database connected');
    })
    .catch((err) => {
        console.log('Oh no! Mongo connection error');
        console.log(err);
    });

const seedDB = async () => {
    await User.deleteMany({});

    for (let user of users) {
        for (let k = 0; k < 15; k++) {
            const results = [];

            for (let i = 0; i < 96; i++) {
                let result = Math.floor(Math.random() * 5);
                results.push(result);
            }

            const firstName = `${user}_${k}`;
            const lastName = `${user}_${k}`;
            const phone = 3514238626;
            const email = `${user}_${k}@${user}_${k}`;
            const password = `${user}_${k}`;
            const username = `${user}_${k}`;
            const score = 0;
            const isAdmin = false;

            const newUser = new User({ firstName, lastName, phone, email, username, results, score, isAdmin });
            await User.register(newUser, password);
        }
    }

    const results = [];

    for (let i = 0; i < 96; i++) {
        let result = Math.floor(Math.random() * 5);
        results.push(result);
    }

    const firstName = 'Quimey';
    const lastName = 'Mata';
    const phone = 123456;
    const email = 'quimey@quimey';
    const password = 'jhlukhrtjncb';
    const username = 'ProdeOficial';
    const score = 0;
    const isAdmin = true;

    const newUser = new User({ firstName, lastName, phone, email, username, results, score, isAdmin });
    await User.register(newUser, password);
};

seedDB().then(() => {
    mongoose.connection.close();
});
