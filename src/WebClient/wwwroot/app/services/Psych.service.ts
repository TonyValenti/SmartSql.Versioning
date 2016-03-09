import {Injectable, Inject, Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

// Add all operators to Observable
import 'rxjs/Rx';

@Injectable()
export class PsychSvc {

    constructor(private http: Http) { }

    apiUrl = "http://localhost:47503/api/";

    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    /**
    * Add religion
    * @param {string} entId
    * @param {string} likereligion
    * @returns
    */
    addReligion(entId: string, religion: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: religion }
        });

        return this.http.post(this.apiUrl + "EntityReligionApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Update religion
    * @param {string} insId
    * @param {string} religion
    * @returns
    */
    updateReligion(insId: string, religion: string) {
        let body = JSON.stringify({
            Key: { EntityId: insId },
            Values: { Value: religion }
        });

        return this.http.post(this.apiUrl + "EntityReligionApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
   * Add Political Affiliation
   * @param {string} entId
   * @param {string} pa
   * @returns
   */
    addPoliticAff(entId: string, pa: string) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: pa }
        });

        return this.http.post(this.apiUrl + "EntityPoliticalAffiliationApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Update Political Affiliation
    * @param {string} insId
    * @param {string} pa
    * @returns
    */
    updatePoliticAff(insId: string, pa: string) {
        let body = JSON.stringify({
            Key: { EntityId: insId },
            Values: { Value: pa }
        });

        return this.http.post(this.apiUrl + "EntityPoliticalAffiliationApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
   * Add Religious frequency
   * @param {string} entId
   * @param {number} rf
   * @returns
   */
    addReligiousFreq(entId: string, rf: number) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: rf }
        });

        return this.http.post(this.apiUrl + "EntityReligiousFrequencyApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Update Religious frequency
    * @param {string} insId
    * @param {number} rf
    * @returns
    */
    updateReligiousFreq(insId: string, rf: number) {
        let body = JSON.stringify({
            Key: { EntityId: insId },
            Values: { Value: rf }
        });

        return this.http.post(this.apiUrl + "EntityReligiousFrequencyApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    } 

    /**
    * add Love lang
    * @param {string} insId
    * @param {Object} ll
    * @returns
    */
    addLL(insId: string, ll: Object) {
        let body = JSON.stringify({
            Key: { EntityId: insId },
            Values: ll
        });

        return this.http.post(this.apiUrl + "EntityLoveLanguageApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
   * Update Love lang
   * @param {string} insId
   * @param {Object} ll
   * @returns
   */
    updateLL(insId: string, ll: Object) {
        let body = JSON.stringify({
            Key: { EntityId: insId },
            Values: ll
        });

        return this.http.post(this.apiUrl + "EntityLoveLanguageApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
   * add Anger lang
   * @param {string} insId
   * @param {Object} al
   * @returns
   */
    addAL(insId: string, al: Object) {
        let body = JSON.stringify({
            Key: { EntityId: insId },
            Values: al
        });

        return this.http.post(this.apiUrl + "EntityAngerLanguageApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
   * Update Anger lang
   * @param {string} insId
   * @param {Object} al
   * @returns
   */
    updateAL(insId: string, al: Object) {
        let body = JSON.stringify({
            Key: { EntityId: insId },
            Values: al
        });

        return this.http.post(this.apiUrl + "EntityAngerLanguageApi/Update", body, this.options)
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
