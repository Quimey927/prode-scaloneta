const User = require('../models/user');

module.exports.showProde = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        req.flash('error', 'No pudimos encontrar este participante');
        return res.redirect('/posiciones');
    }
    res.render('players/show', { user });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('players/edit', { user });
};

module.exports.updateProde = async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, { results: req.body.results });
    req.flash('success', 'Cambios guardados');
    if (req.body.results.includes('')) {
        req.flash('error', '¡Cuidado! Hay campos sin completar');
    }
    res.redirect(`/participantes/${updatedUser._id}`);
}