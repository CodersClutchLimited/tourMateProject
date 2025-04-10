const User = require('../models/user');

module.exports.renderRegister =  (req, res)=>{
    res.render('auth/register')
}

module.exports.register = async(req, res, next)=>{
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err=>{
            if(err) return next(err);
            req.flash('success','Welcome to Yelp Camp!');
            res.redirect('/campgrounds');          
        })
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/campgrounds')
    }
}

module.exports.renderLogin = (req, res)=>{
    res.render('auth/login')
}

module.exports.login = (req, res)=>{
    req.flash('success', 'welcome back to Yelp Camp!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}