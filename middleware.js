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

module.exports.isMissing = (req, res, next) => {
    const ids = ['63531735dcccfccfa5215589', '637795b61429b5180d9993c7', '6355a1098f6fc70100dffb03', '6355a1328f6fc70100dffb20', '63784b28832a72737d747b7e'];
    if (!req.user || !ids.includes(req.user._id.toString())) {
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
