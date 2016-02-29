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
    var LikeSvc;
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
            LikeSvc = (function () {
                function LikeSvc(http) {
                    this.http = http;
                    this.apiUrl = "http://localhost:47503/api/";
                    this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    this.options = new http_1.RequestOptions({ headers: this.headers });
                }
                /**
                     * Add like
                     * @param {string} entId
                     * @param {Object} like
                     * @returns
                     */
                LikeSvc.prototype.addLike = function (entId, like) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: like
                    });
                    return this.http.post(this.apiUrl + "LikeApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Update like
                  * @param {string} insId
                  * @param {Object} like
                  * @returns
                  */
                LikeSvc.prototype.updateLike = function (insId, like) {
                    var body = JSON.stringify({
                        Key: { instanceId: insId },
                        Values: like
                    });
                    return this.http.post(this.apiUrl + "LikeApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Archive like
                * @param {string} instId
                * @returns
                */
                LikeSvc.prototype.archiveLike = function (instId) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId }
                    });
                    return this.http.post(this.apiUrl + "LikeApi/Archive", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                LikeSvc.prototype.logAndPassOn = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error);
                };
                LikeSvc = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LikeSvc);
                return LikeSvc;
            })();
            exports_1("LikeSvc", LikeSvc);
        }
    }
});
//# sourceMappingURL=Like.service.js.map