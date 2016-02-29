import {Injectable, Inject, Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

// Add all operators to Observable
import 'rxjs/Rx';

@Injectable()
export class FinanceSvc {

    constructor(private http: Http) { }

    apiUrl = "http://localhost:47503/api/";
  
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    /**
     * Add Financial
     * @param {string} entId
     * @param {Object} financial
     * @returns
     */
    addFinancial(entId: string, financial: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: financial
        });

        return this.http.post(this.apiUrl + "BankAccountApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update Financial
      * @param {string} insId
      * @param {Object} financial
      * @returns
      */
    updateFinancial(insId: string, financial: Object) {
        let body = JSON.stringify({
            Key: { instanceId: insId },
            Values: financial
        });

        return this.http.post(this.apiUrl + "BankAccountApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Archive Financial
    * @param {string} instId
    * @returns
    */
    archiveFinancial(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "BankAccountApi/Archive", body, this.options)
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
