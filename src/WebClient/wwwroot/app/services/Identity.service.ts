import {Injectable, Inject, Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

// Add all operators to Observable
import 'rxjs/Rx';

@Injectable()
export class IdentitySvc {

    constructor(private http: Http) { }

    apiUrl = "http://localhost:47503/api/";
  
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    /**
     * Add eye color
     * @param {string} eyeColor
     * @returns
     */
    addEyeColor(entId: string, eyeColor: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: eyeColor }
        });
        
        return this.http.post(this.apiUrl + "EyeColorApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Edit eye color
     * @param {string} eyeColor
     * @returns
     */
    updateEyeColor(entId: string, eyeColor: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: eyeColor }
        });        

        return this.http.post(this.apiUrl + "EyeColorApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Add hair color
     * @param {string} hairColor
     * @returns
     */
    addHairColor(entId: string, hairColor: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: hairColor }
        });

        return this.http.post(this.apiUrl + "HairColorApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Edit hair color
     * @param {string} hairColor
     * @returns
     */
    updateHairColor(entId: string, hairColor: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: hairColor }
        });

        return this.http.post(this.apiUrl + "HairColorApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Add ethinicity
    * @param {string} ethinicity
    * @returns
    */
    addEthnicity(entId: string, ethinicity: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: ethinicity }
        });

        return this.http.post(this.apiUrl + "EthnicityApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Edit ethinicity
     * @param {string} ethinicity
     * @returns
     */
    updateEthnicity(entId: string, ethinicity: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: ethinicity }
        });

        return this.http.post(this.apiUrl + "EthnicityApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Add Date of Birth
    * @param {string} dob
    * @returns
    */
    addDOB(entId: string, dob: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: dob }
        });

        return this.http.post(this.apiUrl + "DateOfBirthApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Edit Date of Birth
     * @param {string} dob
     * @returns
     */
    updateDOB(entId: string, dob: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: dob }
        });

        return this.http.post(this.apiUrl + "DateOfBirthApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Add Gov Id
    * @param {string} gvid
    * @returns
    */
    addGovId(entId: string, gvid: string, name:string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: {
                Value: gvid,
                Name: name
            }
        });

        return this.http.post(this.apiUrl + "GovernmentIdentificationApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Edit Gov Id
    * @param {string} gvid
    * @returns
    */
    editGovId(instId: string, gvid: string, name: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId },
            Values: {
                Value: gvid,
                Name: name
            }
        });

        return this.http.post(this.apiUrl + "GovernmentIdentificationApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Delete Gov Id
    * @param {string} gvid
    * @returns
    */
    archiveGovId(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "GovernmentIdentificationApi/Archive", body, this.options)
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
