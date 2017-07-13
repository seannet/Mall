/**
 * Created by sean-laptop on 17-5-28.
 */
(function () {
    crud.install = function (Vue, options) {
        Vue.prototype.test = function () {
            console.log('its working for Test');
        }
    }
}())