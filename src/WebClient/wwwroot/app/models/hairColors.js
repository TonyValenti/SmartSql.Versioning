System.register(['../common/enum'], function(exports_1) {
    var enum_1;
    var hairColors;
    return {
        setters:[
            function (enum_1_1) {
                enum_1 = enum_1_1;
            }],
        execute: function() {
            exports_1("hairColors", hairColors = enum_1.createEnum({
                Black: "Black",
                Brown: "Brown",
                Blonde: "Blonde",
                Red: "Red",
                White: "White",
                Gray: "Gray",
                Bald: "Bald",
                Sandy: "Sandy"
            }));
        }
    }
});
//# sourceMappingURL=hairColors.js.map