import {Injectable, Inject, Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

// Add all operators to Observable
import 'rxjs/Rx';

@Injectable()
export class ClothingSvc {

    constructor(private http: Http) { }

    apiUrl = "http://localhost:47503/api/";

    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    /**
     * Add Clothing Size
     * @param {string} entId
     * @param {string} string
     * @returns
     */
    addClothingSize(entId: string, val: string, apiName: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: val }
        });

        return this.http.post(this.apiUrl + 'Entity' + apiName + "/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update Clothing Size
      * @param {string} insId
      * @param {string} allergy
      * @returns
      */
    updateClothingSize(insId: string, val: string, apiName: string) {
        let body = JSON.stringify({
            Key: { EntityId: insId },
            Values: { Value: val }
        });

        return this.http.post(this.apiUrl + 'Entity' + apiName + "/Update", body, this.options)
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