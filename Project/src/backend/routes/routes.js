/**
 * Created by root on 17-4-12.
 */


exports.setRequestUrl = function(app){

    //Basic
    app.use('/', require('./main/index.js'));

    //Manager
    app.use('/manager', require('./manager/manager.js'));

    //Permission
    app.use('/group', require('./permission/group.js'));

    //Product
    app.use('/product', require('./product/product.js'));
    app.use('/product/category', require('./product/category.js'));
    // app.use('/product/view', require('./product/view.js'));
    // app.use('/product/storage', require('./product/storage.js'));
}