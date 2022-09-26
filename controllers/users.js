const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
};

module.exports.register = async (req, res) => {
    try {
        const { firstName, lastName, phone, username, email, password } = req.body;
        const results = [];

        for (let i = 0; i < 96; i++) {
            results.push('');
        }

        const puntaje = 0;
        const isAdmin = false;
        const user = new User({firstName, lastName, phone, email, username, results, puntaje, isAdmin });
        await User.register(user, password);
        req.flash('success', 'Participante registrado');
        res.redirect('/posiciones');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/registrar');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', '¡Bienvenido!');
    res.redirect(`/participantes/${req.user._id}`);
};

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', '¡Hasta la próxima!');
        res.redirect('/posiciones');
    });
};

module.exports.renderPasswordForm = (req, res) => {
    res.render('users/password')
};

module.exports.createNewPassword = async (req, res, next) => {
    const user = req.user;
    user.changePassword(req.body.oldPassword, req.body.newPassword, function (err) {
        if (err) {
            err.message = 'Contraseña inválida'
            next(err);
        } else {
            req.flash('success', 'Contraseña cambiada con éxito');
            res.redirect(`/participantes/${req.user._id}`);
        }
    });
}
