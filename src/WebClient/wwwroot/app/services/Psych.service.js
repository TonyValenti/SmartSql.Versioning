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
    var PsychSvc;
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
            PsychSvc = (function () {
                function PsychSvc(http) {
                    this.http = http;
                    this.apiUrl = "http://localhost:47503/api/";
                    this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    this.options = new http_1.RequestOptions({ headers: this.headers });
                }
                /**
                * Add religion
                * @param {string} entId
                * @param {string} likereligion
                * @returns
                */
                PsychSvc.prototype.addReligion = function (entId, religion) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: religion }
                    });
                    return this.http.post(this.apiUrl + "ReligionApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Update religion
                * @param {string} insId
                * @param {string} religion
                * @returns
                */
                PsychSvc.prototype.updateReligion = function (insId, religion) {
                    var body = JSON.stringify({
                        Key: { EntityId: insId },
                        Values: { Value: religion }
                    });
                    return this.http.post(this.apiUrl + "ReligionApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
               * Add Political Affiliation
               * @param {string} entId
               * @param {string} pa
               * @returns
               */
                PsychSvc.prototype.addPoliticAff = function (entId, pa) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: pa }
                    });
                    return this.http.post(this.apiUrl + "PoliticalAffiliationApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Update Political Affiliation
                * @param {string} insId
                * @param {string} pa
                * @returns
                */
                PsychSvc.prototype.updatePoliticAff = function (insId, pa) {
                    var body = JSON.stringify({
                        Key: { EntityId: insId },
                        Values: { Value: pa }
                    });
                    return this.http.post(this.apiUrl + "PoliticalAffiliationApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
               * Add Religious frequency
               * @param {string} entId
               * @param {number} rf
               * @returns
               */
                PsychSvc.prototype.addReligiousFreq = function (entId, rf) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: rf }
                    });
                    return this.http.post(this.apiUrl + "ReligiousFrequencyApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Update Religious frequency
                * @param {string} insId
                * @param {number} rf
                * @returns
                */
                PsychSvc.prototype.updateReligiousFreq = function (insId, rf) {
                    var body = JSON.stringify({
                        Key: { EntityId: insId },
                        Values: { Value: rf }
                    });
                    return this.http.post(this.apiUrl + "ReligiousFrequencyApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * add Love lang
                * @param {string} insId
                * @param {Object} ll
                * @returns
                */
                PsychSvc.prototype.addLL = function (insId, ll) {
                    var body = JSON.stringify({
                        Key: { EntityId: insId },
                        Values: ll
                    });
                    return this.http.post(this.apiUrl + "LoveLanguageApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
               * Update Love lang
               * @param {string} insId
               * @param {Object} ll
               * @returns
               */
                PsychSvc.prototype.updateLL = function (insId, ll) {
                    var body = JSON.stringify({
                        Key: { EntityId: insId },
                        Values: ll
                    });
                    return this.http.post(this.apiUrl + "LoveLanguageApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
               * add Anger lang
               * @param {string} insId
               * @param {Object} al
               * @returns
               */
                PsychSvc.prototype.addAL = function (insId, al) {
                    var body = JSON.stringify({
                        Key: { EntityId: insId },
                        Values: al
                    });
                    return this.http.post(this.apiUrl + "AngerLanguageApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
               * Update Anger lang
               * @param {string} insId
               * @param {Object} al
               * @returns
               */
                PsychSvc.prototype.updateAL = function (insId, al) {
                    var body = JSON.stringify({
                        Key: { EntityId: insId },
                        Values: al
                    });
                    return this.http.post(this.apiUrl + "AngerLanguageApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                PsychSvc.prototype.logAndPassOn = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error);
                };
                PsychSvc = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], PsychSvc);
                return PsychSvc;
            })();
            exports_1("PsychSvc", PsychSvc);
        }
    }
});
//# sourceMappingURL=Psych.service.js.map