System.register(['../common/enum'], function(exports_1) {
    var enum_1;
    var LikesEnum;
    return {
        setters:[
            function (enum_1_1) {
                enum_1 = enum_1_1;
            }],
        execute: function() {
            exports_1("LikesEnum", LikesEnum = enum_1.createEnum({
                Beverage: 100,
                Book: 200,
                Food: 300,
                Game: 400,
                Hobby: 500,
                Movie: 600,
                Music: 700,
                Show: 800,
                Sport: 900,
                Store: 1000,
                Vehicle: 1100,
                Other: 9999999
            }));
        }
    }
});
//# sourceMappingURL=Likes.enum.js.map