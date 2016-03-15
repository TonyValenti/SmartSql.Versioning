import {Injectable, Inject, Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

// Add all operators to Observable
import 'rxjs/Rx';

@Injectable()
export class LikeSvc {

    constructor(private http: Http) { }

    apiUrl = "http://localhost:47503/api/";

    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    /**
    * Add like
    * @param {string} entId
    * @param {Object} like
    * @returns
    */
    addLike(entId: string, like: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: like
        });

        return this.http.post(this.apiUrl + "EntityLikeApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Update like
    * @param {string} insId
    * @param {Object} like
    * @returns
    */
    updateLike(insId: string, like: Object) {
        let body = JSON.stringify({
            Key: { instanceId: insId },
            Values: like
        });

        return this.http.post(this.apiUrl + "EntityLikeApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Archive like
    * @param {string} instId
    * @returns
    */
    archiveLike(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "EntityLikeApi/Archive", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    private logAndPassOn(error: Error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error);
    }
}
