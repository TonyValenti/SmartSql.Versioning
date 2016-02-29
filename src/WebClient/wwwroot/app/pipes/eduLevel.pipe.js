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
    var eduLevel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            eduLevel = (function () {
                function eduLevel() {
                }
                eduLevel.prototype.transform = function (value, args) {
                    switch (value) {
                        case 0:
                            return 'None';
                            break;
                        case 1000:
                            return 'High School';
                            break;
                        case 2000:
                            return 'Technical School';
                            break;
                        case 3000:
                            return 'Some College';
                            break;
                        case 4000:
                            return 'Associates Degree';
                            break;
                        case 5000:
                            return 'Batchelors Degree';
                            break;
                        case 6000:
                            return 'Graduate Student';
                            break;
                        case 7000:
                            return 'Masters Degree';
                            break;
                        case 8000:
                            return 'Doctoral Degree';
                            break;
                        default:
                            return 'Select';
                    }
                };
                eduLevel = __decorate([
                    core_1.Pipe({ name: 'eduLevel' }), 
                    __metadata('design:paramtypes', [])
                ], eduLevel);
                return eduLevel;
            })();
            exports_1("eduLevel", eduLevel);
        }
    }
});
//# sourceMappingURL=eduLevel.pipe.js.map