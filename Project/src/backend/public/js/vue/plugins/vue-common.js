/**
 * Created by sean-laptop on 17-6-5.
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
        (global.VueCommon = factory())
}(this, (function () { 'use strict';


var makeMixin = function (Vue, options) { return({
    // computed : (ojb = {}, obj[])
})

}

//Pagination
var pagination = function () {
}

pagination.prototype.tester = 'its pagination tester';
pagination.prototype.test = function (param) {
    console.log(this.tester, param);
}
Vue.extend()

//Plugin
function plugin(Vue) {


    if (plugin.installed) {
        return;
    }

    Vue.search = {};
    Vue.pagination = {};
    Vue.commons = 'version common';

    // Vue.mixin(makeMixin(Vue, options))
    Object.defineProperties(Vue.prototype, {
        testic : function () {
            console.log('Vue common test');
        },

        testof : {
            get : function get(test) {
                console.log('vue common testof ', test);
                var p;
                console.log(p = new pagination(), p.test);
                return this.pagination;
            },

            testicIn :function () {
                console.log('Vue, testic inner');
            }
        },

        $pagination : {
            get : function get() {
                return new pagination();
            }
        }
    });


}

    if (typeof window !== 'undefined' && window.Vue) {
        window.Vue.use(plugin);
    }
return plugin;
})))