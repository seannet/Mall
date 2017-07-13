/**
 * Created by root on 17-4-12.
 */


exports.setRequestUrl = function(app){

    //Basic
    app.use('/', require('./index.js'));
    app.use('/manager', require('./manager.js'));

    //User;
    app.use('/user', require('./user.js'));
    app.use('/customer', require('./customer.js'));

    //Project
    app.use('/project', require('./project/project'));
    app.use('/server', require('./project/server.js'));
    app.use('/domain', require('./project/domain.js'))

    //Business;
    app.use('/business', require('./business/business.js'))
    app.use('/partner', require('./business/partner.js'))

}