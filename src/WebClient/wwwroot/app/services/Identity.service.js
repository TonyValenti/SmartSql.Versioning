System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var IdentitySvc;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            IdentitySvc = (function () {
                function IdentitySvc(http) {
                    this.http = http;
                    this.apiUrl = "http://localhost:47503/api/";
                    this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    this.options = new http_1.RequestOptions({ headers: this.headers });
                }
                /**
                 * Add eye color
                 * @param {string} eyeColor
                 * @returns
                 */
                IdentitySvc.prototype.addEyeColor = function (entId, eyeColor) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: eyeColor }
                    });
                    return this.http.post(this.apiUrl + "EyeColorApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                 * Edit eye color
                 * @param {string} eyeColor
                 * @returns
                 */
                IdentitySvc.prototype.updateEyeColor = function (entId, eyeColor) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: eyeColor }
                    });
                    return this.http.post(this.apiUrl + "EyeColorApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                 * Add hair color
                 * @param {string} hairColor
                 * @returns
                 */
                IdentitySvc.prototype.addHairColor = function (entId, hairColor) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: hairColor }
                    });
                    return this.http.post(this.apiUrl + "HairColorApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                 * Edit hair color
                 * @param {string} hairColor
                 * @returns
                 */
                IdentitySvc.prototype.updateHairColor = function (entId, hairColor) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: hairColor }
                    });
                    return this.http.post(this.apiUrl + "HairColorApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Add ethinicity
                * @param {string} ethinicity
                * @returns
                */
                IdentitySvc.prototype.addEthnicity = function (entId, ethinicity) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: ethinicity }
                    });
                    return this.http.post(this.apiUrl + "EthnicityApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                 * Edit ethinicity
                 * @param {string} ethinicity
                 * @returns
                 */
                IdentitySvc.prototype.updateEthnicity = function (entId, ethinicity) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: ethinicity }
                    });
                    return this.http.post(this.apiUrl + "EthnicityApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Add Date of Birth
                * @param {string} dob
                * @returns
                */
                IdentitySvc.prototype.addDOB = function (entId, dob) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: dob }
                    });
                    return this.http.post(this.apiUrl + "DateOfBirthApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                 * Edit Date of Birth
                 * @param {string} dob
                 * @returns
                 */
                IdentitySvc.prototype.updateDOB = function (entId, dob) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: dob }
                    });
                    return this.http.post(this.apiUrl + "DateOfBirthApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Add Gov Id
                * @param {string} gvid
                * @returns
                */
                IdentitySvc.prototype.addGovId = function (entId, gvid, name) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: {
                            Value: gvid,
                            Name: name
                        }
                    });
                    return this.http.post(this.apiUrl + "GovernmentIdentificationApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Edit Gov Id
                * @param {string} gvid
                * @returns
                */
                IdentitySvc.prototype.editGovId = function (instId, gvid, name) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId },
                        Values: {
                            Value: gvid,
                            Name: name
                        }
                    });
                    return this.http.post(this.apiUrl + "GovernmentIdentificationApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Delete Gov Id
                * @param {string} gvid
                * @returns
                */
                IdentitySvc.prototype.archiveGovId = function (instId) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId }
                    });
                    return this.http.post(this.apiUrl + "GovernmentIdentificationApi/Archive", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                IdentitySvc.prototype.logAndPassOn = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error);
                };
                IdentitySvc = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], IdentitySvc);
                return IdentitySvc;
            })();
            exports_1("IdentitySvc", IdentitySvc);
        }
    }
});
//# sourceMappingURL=Identity.service.js.map