/**
 * Created by sean-laptop on 17-6-23.
 */


Vue.use(VeeValidate);
var vm = new Vue({
    el : '#app',
    data : {
        temp    : temp,
        type    : temp.type,
        url     : temp.url,
        /* Form Model */
        model   : temp.model,
        /* Data List */
        items   : [],
        search  : {},
        sort    : {name : -1},
        pagination : {
            cur     : 1,
            total   : 1,
            pages   : 10,
            page    : 1,
            size    : 60
        },
        /*Form*/
        select : [],
        /* Category */
        category : {
            editId  : '',
            delId   : '',
            plist   : '',
            options1 : new Array(),
            options2 : new Array(),
            options3 : new Array(),
            options4 : new Array(),
        },
        catEdit : '',
        cat1 : [1],
        cat2 : [1],
        cat3 : [1],
        cat4 : [1],
        options1 : new Array(),
        options2 : new Array(),
        options3 : new Array(),
        options4 : new Array(),
        // category : []

    },
    mounted : function () {
        // this.onInit();
        this.pagination.pages = Math.ceil(this.pagination.total/this.pagination.size);

        if (this.type == 'create'){

        } else if (this.type == 'list') {
            this.onInit();
        } else if (this.type == 'category') {
           this.onCategory();
        }
    },
    watch : {
        select : function (option) {
            console.log(option);
            console.log(this);
        },
        cat1 : function (option) {
            var selected = option[0];
            //set Value
            this.model.cat1 = selected;
            this.model.catType = 1;
            //set Edit
            this.category.editId = selected;
            this.category.delId = selected;
            //option
            this.category.options2 = this.category.plist[selected];
        },
        cat2 : function (option) {
            var selected = option[0];
            //set Value
            this.model.cat2 = selected;
            this.model.catType = 2;
            //set Edit
            this.category.editId = selected;
            this.category.delId = selected;
            //option
            this.category.options3 = this.category.plist[selected];
        },
        cat3 : function (option) {
            var selected = option[0];
            //set Value
            this.model.cat3 = selected;
            this.model.catType = 3;
            //set Edit
            this.category.editId = selected;
            this.category.delId = selected;
            //option
            this.category.options4 = this.category.plist[selected];
        },
        cat4 : function (option) {
            var selected = option[0];
            //set Value
            this.model.cat4 = selected;
            // this.model.catType = 4;
            //set Edit
            this.category.editId = selected;
            this.category.delId = selected;
        }

    },
    methods : {
        /* Validate */
        validateBeforeSubmit : function () {
            var $this = this;
            this.$validator.validateAll().then(function(){
                // eslint-disable-next-line
                $this.onSubmit();
            }).catch(function(){
                // eslint-disable-next-line
            });
        },
        /* Submit|Send */
        onSubmit : function () {

            var $this = this;
            // var formData = new FormData($this.model);
            // console.log(formData, $this.model);
            this.$http.post($this.url.post,  {model : $this.model})
                .then(function (json) {
                    if (json.body.code == 200) {
                        top.location = $this.url.direct;
                    } else if (json.body.code == 300) {
                        var errors = json.body.errors;
                        for(var field in errors) {
                            $this.errors.add(field, errors[field]);
                        }
                    }
                })
        },

        /* Data List */
        onInit : function () {
            this.onRequest({});
        },

        // onSearch : function () {
        //     this.onRequest(this.search);
        // },

        onChange : function () {
            this.onRequest(this.search);
        },

        onRequest : function(search) {
            var $this = this;
            this.$http.post($this.url.data, {
                search : $this.search,
                pagination : $this.pagination,
                sort : $this.sort
            })
                .then(function (json) {
                    var result = json.body;
                    if (result.code == 200){
                        $this.items = result.data.lists;
                        $this.pagination.total = result.data.total;

                    } else if (result.code == 300) {

                    }
                })
        },

        /*Pagination*/
        onPrev  : function () {
            this.onPage(this.pagination.page -1);
        },
        onNext  : function () {
            this.onPage(this.pagination.page +1);
        },
        onFirst : function () {
            this.onPage(1);
        },
        onLast  : function () {
            this.onPage(this.pagination.pages);
        },
        onPage  : function (page) {
            var $this = this;
            $this.pagination.page = page;
            if ($this.pagination.page == $this.pagination.cur) {
                return false;
            }
            if($this.pagination.page > $this.pagination.pages) {
                $this.pagination.page = $this.pagination.pages;
            } else if (page < 1) {
                $this.pagination.page = 1;
            }

            $this.pagination.cur = $this.pagination.page;

            $this.onRequest();
        },
        /*Category*/
        onCategory : function () {
            this.$http.post(this.url.load, {}). then (function(json) {
                if (json.body.code == 200) {
                    this.category.plist = json.body.data;
                    this.category.options1 = this.category.plist['top'];
                    if (this.model.cat1) {
                        this.cat1 = this.model.cat1;
                    }
                } else {
                    this.category.plist = [];
                }
                this.model.catType = 0;
            });
        },
        onCategoryEdit : function () {
            if (this.category.editId) {
                top.location = this.url.self + '/' + this.category.editId;
            }
        },
        onCategoryDel : function () {
            if (this.category.delId) {
                top.location = this.url.del + '/' + this.category.delId;
            }
        },



    }
});