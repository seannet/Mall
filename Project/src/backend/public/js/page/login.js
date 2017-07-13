/**
 * Created by sean-laptop on 17-4-8.
 */
Vue.use(VeeValidate);
var vue = new Vue({
    el : '#login',
    data : {
        validator : null,
        local : 'zh_CN',
        isValid : false,
        model : {
            email : 'admin@domain.com',
            password : ''
        },
    },
    mounted : function(){
        // this.$validator.setLocale(this.local);

        this.validator = new VeeValidate.Validator({
            email: 'required|email',
            password: 'required|min:6'
        });

        // this.$validator.Validator({
        //     email: 'required|email',
        //     password: 'required|min:6'
        // })
    },
    methods : {

        onLogin : function (url) {
            var $this = this;
            // this.$validator.validateAll().then(function (e) {
            //
            // }).catch(function (e) {
            //
            // })

            this.validator.validateAll(this.model).then(function (e) {
                console.log(e);
                $this.$http
                    .post(url, {'model' :$this.model})
                    .then(function(json){
                        console.log(json.code, json);
                        if (json.body.code == 200){

                            top.location = '/';
                        } else if (json.body.code == 300) {
                            // this.errors.add()
                        }
                    });
            }).catch(function (e) {
                console.log(e)
            });
            return false;
        },

        created : function () {

            var $this = this;
            // this.$set(this, 'errors', this.validator.errorBag);
        },

    }
});