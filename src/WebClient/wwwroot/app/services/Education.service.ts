import {Injectable, Inject, Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

// Add all operators to Observable
import 'rxjs/Rx';

@Injectable()
export class EducationSvc {

    constructor(private http: Http) { }

    apiUrl = "http://localhost:47503/api/";
  
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    /**
  * Add Religious frequency
  * @param {string} entId
  * @param {number} lvl
  * @returns
  */
    addEducationLvl(entId: string, lvl: number) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: lvl }
        });

        return this.http.post(this.apiUrl + "EducationLevelApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Update Religious frequency
    * @param {string} insId
    * @param {number} lvl
    * @returns
    */
    updateEducationLvl(insId: string, lvl: number) {
        let body = JSON.stringify({
            Key: { EntityId: insId },
            Values: { Value: lvl }
        });

        return this.http.post(this.apiUrl + "EducationLevelApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    } 


    /**
     * Add Certificate
     * @param {string} entId
     * @param {Object} certificate
     * @returns
     */
    addCertificate(entId: string, certificate: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: certificate
        });

        return this.http.post(this.apiUrl + "CertificationApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update Certificate
      * @param {string} insId
      * @param {Object} certificate
      * @returns
      */
    updateCertificate(insId: string, certificate: Object) {
        let body = JSON.stringify({
            Key: { instanceId: insId },
            Values: certificate
        });

        return this.http.post(this.apiUrl + "CertificationApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Archive Certificate
    * @param {string} instId
    * @returns
    */
    archiveCertificate(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "CertificationApi/Archive", body, this.options)
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
