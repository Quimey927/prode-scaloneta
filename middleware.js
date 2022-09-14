const User = require('./models/user');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'Tenés que loguearte primero');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAdmin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        req.flash('error', 'No tenés permiso para hacer eso');
        return res.redirect('/posiciones');
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
        req.flash('error', 'No pudimos encontrar este participante');
        return res.redirect('/posiciones');
    }
    
    if (!user._id.equals(req.user._id)) {
        req.flash('error', 'No tenés permiso para hacer eso');
        return res.redirect(`/participantes/${id}`);
    }
    next();
}
