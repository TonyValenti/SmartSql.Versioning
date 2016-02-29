System.register(['angular2/core', 'angular2/common', '../models/Person'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, Person_1;
    var SelectedPersonDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Person_1_1) {
                Person_1 = Person_1_1;
            }],
        execute: function() {
            SelectedPersonDirective = (function () {
                function SelectedPersonDirective() {
                }
                SelectedPersonDirective.prototype.openChangeName = function (event, isAdd) {
                    event.preventDefault();
                    if (isAdd) {
                    }
                    $('#editPersonNameModal').modal('show');
                };
                SelectedPersonDirective.prototype.closeChangeName = function (event, txtName) {
                    event.preventDefault();
                    txtName.value = this.selectedPerson.name;
                    $('#editPersonNameModal').modal('hide');
                };
                SelectedPersonDirective.prototype.changeName = function (event, txtNameVal) {
                    event.preventDefault();
                    this.selectedPerson.name = txtNameVal;
                    $('#editPersonNameModal').modal('hide');
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Person_1.Person)
                ], SelectedPersonDirective.prototype, "selectedPerson", void 0);
                SelectedPersonDirective = __decorate([
                    core_1.Component({
                        selector: 'selected-person',
                        templateUrl: '../app/templates/selectedPerson.html',
                        directives: [common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SelectedPersonDirective);
                return SelectedPersonDirective;
            })();
            exports_1("SelectedPersonDirective", SelectedPersonDirective);
        }
    }
});
//# sourceMappingURL=SelectedPerson.directive.js.map