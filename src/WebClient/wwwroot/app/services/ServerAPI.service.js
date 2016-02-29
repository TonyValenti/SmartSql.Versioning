System.register(['angular2/core', '../models/Person', 'angular2/http', 'rxjs/Observable', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Person_1, http_1, Observable_1;
    var ServerAPI;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Person_1_1) {
                Person_1 = Person_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            ServerAPI = (function () {
                function ServerAPI(http) {
                    this.http = http;
                    this.peopleList = [];
                }
                /**
                 * @description Get person by Instance Id
                 * @param {string} instanceId
                 * @returns Person
                 */
                ServerAPI.prototype.getPersonByInstanceId = function (instanceId) {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    // If Person is already in memory
                    // just return it
                    if (ServerAPI.person) {
                        return Observable_1.Observable.create(function (observer) {
                            observer.next(ServerAPI.person);
                            observer.complete();
                        });
                    }
                    else {
                        var httploc = this.http;
                        return Observable_1.Observable.create(function (observer) {
                            httploc.post(ServerAPI.apiUrl + 'EntityApi/Details', JSON.stringify({
                                "Key": {
                                    "InstanceId": instanceId
                                }
                            }), { headers: headers })
                                .map(function (res) { return Person_1.Person.createRPerson(res.json()); }).subscribe(function (person) {
                                ServerAPI.person = person;
                                observer.next(ServerAPI.person);
                                observer.complete();
                            });
                        });
                    }
                };
                /**
                 * @description get a json list of
                 * @returns Obesrvable list of Persons
                 */
                ServerAPI.prototype.getAllPeople = function () {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post(ServerAPI.apiUrl + '/EntityApi/List', '', { headers: headers })
                        .map(function (res) { return res.json(); })
                        .subscribe(function (plist) {
                        console.log("People list: ", plist);
                        // If PeopleList is already in memory
                        // just return it
                        if (_this.peopleList.length > 0) {
                            return Observable_1.Observable.from(_this.peopleList).toArray();
                        }
                        if (localStorage.getItem("people")) {
                            // If data is cached in localStorage, use it
                            for (var _i = 0, _a = JSON.parse(localStorage.getItem("people")); _i < _a.length; _i++) {
                                var personJson = _a[_i];
                                _this.peopleList.push(Person_1.Person.createRPerson(personJson));
                            }
                            return Observable_1.Observable.from(_this.peopleList).toArray();
                        }
                        else {
                            // LocalStorage is empty
                            for (var _b = 0; _b < plist.length; _b++) {
                                var personJson = plist[_b];
                                _this.peopleList.push(Person_1.Person.createRPerson(personJson));
                            }
                            return Observable_1.Observable.from(_this.peopleList).toArray();
                        }
                        ;
                        return Observable_1.Observable.from(_this.peopleList).toArray();
                    });
                };
                /**
                 * Add Person
                 * @param {string} name
                 * @returns
                 */
                ServerAPI.prototype.addPerson = function (name) {
                    var body = JSON.stringify({
                        Values: { Name: name }
                    });
                    var options = new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) });
                    return this.http.post(ServerAPI.apiUrl + "EntityApi/Add", body, options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                 * Update Person
                 * @param {string} instanceId
                 * @param {string} name
                 * @returns
                 */
                ServerAPI.prototype.updatePerson = function (instanceId, name) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instanceId },
                        Values: { Name: name }
                    });
                    return this.http.post(ServerAPI.apiUrl + "EntityApi/Update", body, new http_1.RequestOptions({ headers: new http_1.Headers({ 'Content-Type': 'application/json' }) }))
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
             $Person = Invoke-RestMethod -Method Post -Uri "http://localhost:47503/api/EntityApi/Add" -Headers $Headers -Body (ConvertTo-Json @{
                    Values = @{
                        Name = $EntityName;
                    };
                })
                 */
                ServerAPI.prototype.logAndPassOn = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error);
                };
                ServerAPI.apiUrl = "http://localhost:47503/api/";
                ServerAPI = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ServerAPI);
                return ServerAPI;
            })();
            exports_1("ServerAPI", ServerAPI);
        }
    }
});
//# sourceMappingURL=ServerAPI.service.js.map