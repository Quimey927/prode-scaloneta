const User = require('../models/user');
const stage = process.env.STAGE;

const classifiedTeams = require('../classifiedTeams');

module.exports.showProde = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        req.flash('error', 'No pudimos encontrar este participante');
        return res.redirect('/posiciones');
    }
    res.render('players/show', { user, stage, classifiedTeams });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('players/edit', { user, stage, classifiedTeams });
};

module.exports.updateProde = async (req, res) => {
    const { id } = req.params;
    const { results } = req.body;
    const user = await User.findById(id);
    const userResults = [...user.results];
    let updatedUser = {};

    for (let index in results) {
        userResults[index] = results[index];
    }

    if (stage === 'Group Stage') {
        const { topScorer, champion } = req.body;
        updatedUser = await User.findByIdAndUpdate(id, { results: userResults, topScorer, champion });
    } else {
        updatedUser = await User.findByIdAndUpdate(id, { results: userResults });
    }

    req.flash('success', 'Cambios guardados');
    if (Object.values(results).includes('')) {
        req.flash('error', '¡Cuidado! Hay campos sin completar');
    }
    res.redirect(`/participantes/${updatedUser._id}`);
}