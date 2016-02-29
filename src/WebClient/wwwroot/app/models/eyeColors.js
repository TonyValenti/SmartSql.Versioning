System.register(['../common/enum'], function(exports_1) {
    var enum_1;
    var eyeColors;
    return {
        setters:[
            function (enum_1_1) {
                enum_1 = enum_1_1;
            }],
        execute: function() {
            exports_1("eyeColors", eyeColors = enum_1.createEnum({
                Black: "Black",
                Blue: "Blue",
                Brown: "Gray",
                Green: "Green",
                Hazel: "Hazel",
                Pink: "Pink"
            }));
        }
    }
});
//# sourceMappingURL=eyeColors.js.map