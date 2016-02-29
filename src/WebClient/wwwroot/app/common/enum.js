System.register([], function(exports_1) {
    function createEnum(a) {
        var i = Object
            .keys(a)
            .reduce(function (o, k) { return (o[a[k]] = k, o); }, {});
        return Object.freeze(Object.keys(a).reduce(function (o, k) { return (o[k] = a[k], o); }, function (v) { return i[v]; }));
    }
    exports_1("createEnum", createEnum);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=enum.js.map