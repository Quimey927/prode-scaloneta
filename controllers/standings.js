const User = require('../models/user');

module.exports.standings = async (req, res) => {
    const users = await User.find({ username: { $ne: 'ProdeOficial' } });
    const prodeOficial = await User.findOne({ username: 'ProdeOficial' });
    
    const winnerGuess = 4;
    const exactResult = 3;
    const championGuess = 7;
    const topScorerGuess = 5;

    for (let user of users) {
        user.score = 0;
        for (let i = 0; i < 128; i += 2) {
            if (user.results[i] !== null && user.results[i + 1] !== null && prodeOficial.results[i] !== null && prodeOficial.results[i + 1] !== null) {
                let userResult = user.results[i] - user.results[i + 1];
                let prodeOficialResult = prodeOficial.results[i] - prodeOficial.results[i + 1];
                if (Math.sign(userResult) === Math.sign(prodeOficialResult)) {
                    user.score = user.score + winnerGuess;
                    if (user.results[i] === prodeOficial.results[i] && user.results[i + 1] === prodeOficial.results[i + 1]) {
                        user.score = user.score + exactResult;
                    }
                }
            }
        }

        if (user.champion !== 'Sin elegir aún' && prodeOficial.champion !== 'Sin elegir aún') {
            if (user.champion === prodeOficial.champion) {
                user.score += championGuess;
            }
        }

        if (user.topScorer !== 'Sin elegir aún' && prodeOficial.topScorer !== 'Sin elegir aún') {
            if (user.topScorer === prodeOficial.topScorer) {
                user.score += topScorerGuess;
            }
        }

        await user.save();
    }

    users.sort((userOne, userTwo) => userTwo.score - userOne.score);

    let counter = 1;
    let samePosition = 1;
    let currentScore = users[0].score;
    
    for (let user of users) {
        // Activate this code just before loading the first match result

        // user.score === currentScore ? user.position = samePosition : user.position = counter;
        // if (user.score !== currentScore) {
        //     samePosition = counter;
        // }
        // counter += 1;
        // currentScore = user.score;

        // Desactivate this code just before loading the first match result
        user.position = counter;
        counter += 1;
    }
    
    res.render('standings', { users });
};
