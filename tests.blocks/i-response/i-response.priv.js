BEM.decl('i-response', null, 
    ['send', 'error', 'redirect', 'missing'].reduce(function (stat, name) {
        stat[name] = function () {
            var res = this._getResponse(),
                state = JSON.stringify(process.domain.state, function (key, val) {
                    return ((key === 'res' || key === 'req')) ? null : val;
                });

            res.setHeader('c-node-state', state);
            return this.__base.apply(this, arguments);
        }
        return stat;
    }, {})
);
