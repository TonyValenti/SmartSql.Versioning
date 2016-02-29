System.register(['angular2/core', '../services/ServerAPI.service', '../services/Clothing.service', '../directives/SelectedPerson.directive', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, ServerAPI_service_1, Clothing_service_1, SelectedPerson_directive_1, router_1;
    var ClothingSizesView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ServerAPI_service_1_1) {
                ServerAPI_service_1 = ServerAPI_service_1_1;
            },
            function (Clothing_service_1_1) {
                Clothing_service_1 = Clothing_service_1_1;
            },
            function (SelectedPerson_directive_1_1) {
                SelectedPerson_directive_1 = SelectedPerson_directive_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ClothingSizesView = (function () {
                function ClothingSizesView(_serverAPI, _clothingSvc, _routeParams) {
                    this._serverAPI = _serverAPI;
                    this._clothingSvc = _clothingSvc;
                    this._routeParams = _routeParams;
                    var instanceId = this._routeParams.get('instanceId');
                    if (!instanceId) {
                        alert("No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e");
                    }
                    var self = this;
                    _serverAPI.getPersonByInstanceId(instanceId).subscribe(function (p) {
                        self.selectedDude = p;
                        self.clothingSizes = p.clothingSizes;
                    }, function (error) { return alert("Server error. Try again later"); });
                }
                ClothingSizesView.prototype.editClothingSizes = function (event, typeOfClothing) {
                    event.preventDefault();
                    this.clothingType = typeOfClothing;
                    switch (typeOfClothing) {
                        case "Shirt":
                            this.clothingTypeName = "shirt";
                            break;
                        case "Pant":
                            this.clothingTypeName = "pants";
                            break;
                        case "Shoe":
                            this.clothingTypeName = "shoe";
                            break;
                        case "Belt":
                            this.clothingTypeName = "belt";
                            break;
                        case "Head":
                            this.clothingTypeName = "head";
                            break;
                        case "Dress":
                            this.clothingTypeName = "dress";
                            break;
                        default:
                            break;
                    }
                    $('#editClothingSize').modal('show');
                };
                ClothingSizesView.prototype.saveClothing = function (event, newValue) {
                    event.preventDefault();
                    if (!this.clothingSizes[this.clothingType] && newValue) {
                        //Add
                        this._clothingSvc.addClothingSize(this.selectedDude.instanceId, newValue, this.clothingType + 'SizeApi').subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editClothingSize').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Edit
                        this._clothingSvc.updateClothingSize(this.selectedDude.instanceId, newValue, this.clothingType + 'SizeApi').subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editClothingSize').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.clothingSizes[this.clothingType] = newValue;
                    $('#editClothingSize').modal('hide');
                };
                ClothingSizesView.prototype.closeClothingModal = function (event, txtEthnicity) {
                    event.preventDefault();
                    txtEthnicity.value = this.clothingSizes[this.clothingType];
                    $('#editClothingSize').modal('hide');
                };
                ClothingSizesView = __decorate([
                    core_1.Component({
                        selector: 'clothingSizes',
                        templateUrl: '../app/templates/clothingSizes.html',
                        directives: [SelectedPerson_directive_1.SelectedPersonDirective],
                        providers: [Clothing_service_1.ClothingSvc]
                    }),
                    __param(0, core_1.Inject(ServerAPI_service_1.ServerAPI)), 
                    __metadata('design:paramtypes', [Object, Clothing_service_1.ClothingSvc, router_1.RouteParams])
                ], ClothingSizesView);
                return ClothingSizesView;
            })();
            exports_1("ClothingSizesView", ClothingSizesView);
        }
    }
});
//# sourceMappingURL=ClothingSizesView.component.js.map