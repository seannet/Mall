/**
 * Created by sean-laptop on 17-5-6.
 */

function listData(model, req, res, search, common) {
    // manager.find({}, function (err, manager) {
    //     res.send(common.json(true, 'ok', manager));
    // })
    var count;
    var condition       = search || req.body.search || {};
    var pagination      = req.body.pagination || {};
    var sort            = req.body.sort || {};
    pagination.page     = pagination.page || 1;
    pagination.limit    = pagination.limit || 60;
    var skip = (pagination.page - 1) * pagination.limit;
    // condition.is_admin = false;
    // condition.email ='/'+condition.email+'/i';
    model.find(condition).count(function (err, count) {
        // count = count;
        // console.log(count);

        model.find(condition)
            .sort(sort)
            .skip(skip)
            .limit(pagination.limit).exec(function (err, managers) {
            if (err) {
                res.send(common.json(false, 'error', err));
            } else {
                res.send(common.json(true, 'ok', {
                    page: pagination.page,
                    limit: pagination.limit,
                    total : count || 3,
                    lists: managers,
                }));
            }
        })
    })
}



exports.listData = listData;