/**
 * Created by sean-laptop on 17-5-23.
 */

module.exports = {

    getConst : function () {
        var rtn = {};
        if (this.schema.obj){
            var items = this.schema.obj;
            var withOut = ['created', 'updated','pass', 'password'];
            var val;
            for(var i in items) {
                //定义Value
                if (typeof items[i] == 'Object' || typeof items[i] == 'object') {
                    val = "";
                } else if (typeof items[i] == 'Array' || typeof items[i] == 'array'){
                    val = [];
                }

                //Without some Value;
                if (withOut.indexOf(i) < 0) {
                    rtn[i] = val;
                }
            }
            // rtn['_id'] = '';
        }
        return rtn;
    },

    dataList : function (req, model, callback) {
        var count, condition={};
        var conditions      = req.body.search || {};
        var pagination      = req.body.pagination || {};
        var sort            = req.body.sort || {};
        pagination.page     = pagination.page || 1;
        pagination.limit    = pagination.limit || 60;
        var skip = (pagination.page - 1) * pagination.limit;

        //ForEach  | RegExp | Search Condition
        for(var k in conditions) {
            if (conditions[k]) {
                condition[k] = new RegExp(conditions[k]);
            }
        }

        //Find
        model.find(condition).count(function (err, count) {

            model.find(condition)
                .sort(sort)
                .skip(skip)
                .limit(pagination.limit).exec(function (err, managers) {
                if (err) {
                    callback(err, {});
                } else {
                    callback(err, {
                        page: pagination.page,
                        limit: pagination.limit,
                        total : count || 0,
                        lists: managers,
                    })
                }
            })
        })
    },

    
    saver : function (req, callback) {
        if (req.body.model.id) {
            this.findById(req.body.model.id, function (err, doc) {

            })
        } else {

        }
    }
};

