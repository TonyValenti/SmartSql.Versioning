System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var bloodtype;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /*
             * O-	O+	A-	A+	B-	B+	AB-	AB+ (The + and - spelled out "O Positive")
             *
             *
             * ///
            */
            bloodtype = (function () {
                function bloodtype() {
                }
                bloodtype.prototype.transform = function (value, args) {
                    //var sign = value.slice(-1);
                    //remove the sign
                    //value = value.slice(0, -1);
                    //return value + (sign === "+" ? "-Positive" : "-Negative");
                    switch (value) {
                        case 0:
                            return 'Unknown';
                            break;
                        case 1100:
                            return 'A Positive';
                            break;
                        case 1200:
                            return 'A Negative';
                            break;
                        case 2100:
                            return 'B Positive';
                            break;
                        case 2200:
                            return 'B Negative';
                            break;
                        case 3100:
                            return 'AB Positive';
                            break;
                        case 3200:
                            return 'AB Negative';
                            break;
                        case 4100:
                            return 'O Positive';
                            break;
                        case 4200:
                            return 'O Negative';
                            break;
                        default:
                            return 'Select';
                    }
                };
                bloodtype = __decorate([
                    core_1.Pipe({ name: 'bt' }), 
                    __metadata('design:paramtypes', [])
                ], bloodtype);
                return bloodtype;
            })();
            exports_1("bloodtype", bloodtype);
        }
    }
});
//# sourceMappingURL=bloodtype.pipe.js.map