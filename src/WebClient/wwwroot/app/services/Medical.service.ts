import {Injectable, Inject, Component} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

// Add all operators to Observable
import 'rxjs/Rx';

@Injectable()
export class MedicalSvc {

    constructor(private http: Http) { }

    apiUrl = "http://localhost:47503/api/";

    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

    people;

    /**
     * Add Sex
     * @param {string} sex
     * @returns
     */
    addSex(entId: string, sex: number) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: sex }
        });

        return this.http.post(this.apiUrl + "EntitySexApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Edit Sex
     * @param {string} sex
     * @returns
     */
    updateSex(entId: string, sex: number) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: sex }
        });

        return this.http.post(this.apiUrl + "EntityBloodTypeApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Add blood type
    * @param {string} bt
    * @returns
    */
    addBloodType(entId: string, bt: number) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: bt }
        });

        return this.http.post(this.apiUrl + "EntityBloodTypeApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Edit blood type
     * @param {string} bt
     * @returns
     */
    updateBloodType(entId: string, bt: number) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: { Value: bt }
        });

        return this.http.post(this.apiUrl + "EntityBloodTypeApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }


    /**
     * Add height
     * @param {string} entId
     * @param {number} unit
     * @param {number} value
     * @returns
     */
    addHeight(entId: string, unit: number, value: number) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: {
                Value: value,
                Unit: unit
            }
        });

        return this.http.post(this.apiUrl + "EntityHeightApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update height
      * @param {string} entId
      * @param {number} unit
      * @param {number} value
      * @returns
      */
    updateHeight(entId: string, unit: number, value: number) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: {
                Value: value,
                Unit: unit
            }
        });

        return this.http.post(this.apiUrl + "EntityHeightApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Add weight
    * @param {string} entId
    * @param {number} unit
    * @param {number} value
    * @returns
    */
    addWeight(entId: string, unit: number, value: number) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: {
                Value: value,
                Unit: unit
            }
        });

        return this.http.post(this.apiUrl + "EntityWeightApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update weight
      * @param {string} entId
      * @param {number} unit
      * @param {number} value
      * @returns
      */
    updateWeight(entId: string, unit: number, value: number) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: {
                Value: value,
                Unit: unit
            }
        });

        return this.http.post(this.apiUrl + "EntityWeightApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Add allergy
     * @param {string} entId
     * @param {Object} allergy
     * @returns
     */
    addAllergy(entId: string, allergy: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: allergy
        });

        return this.http.post(this.apiUrl + "EntityAllergyApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update allergy
      * @param {string} insId
      * @param {Object} allergy
      * @returns
      */
    updateAllergy(insId: string, allergy: Object) {
        let body = JSON.stringify({
            Key: { InstanceId: insId },
            Values: allergy
        });

        return this.http.post(this.apiUrl + "EntityAllergyApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Archive Allergy
    * @param {string} instId
    * @returns
    */
    archiveAllergy(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "EntityAllergyApi/Archive", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Add Medication
    * @param {string} entId
    * @param {Object} medication
    * @returns
    */
    addMedication(entId: string, medication: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: medication
        });

        return this.http.post(this.apiUrl + "EntityMedicationApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update allergyMedication
      * @param {string} insId
      * @param {Object} medication
      * @returns
      */
    updateMedication(insId: string, medication: Object) {
        let body = JSON.stringify({
            Key: { InstanceId: insId },
            Values: medication
        });

        return this.http.post(this.apiUrl + "EntityMedicationApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }


    /**
    * Archive Medication
    * @param {string} instId
    * @returns
    */
    archiveMedication(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "EntityMedicationApi/Archive", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }


    /**
    * Add Procedure
    * @param {string} entId
    * @param {Object} procedure
    * @returns
    */
    addProcedure(entId: string, procedure: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: procedure
        });

        return this.http.post(this.apiUrl + "EntityProcedureApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update Procedure
      * @param {string} insId
      * @param {Object} procedure
      * @returns
      */
    updateProcedure(insId: string, procedure: Object) {
        let body = JSON.stringify({
            Key: { InstanceId: insId },
            Values: procedure
        });

        return this.http.post(this.apiUrl + "EntityProcedureApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }


    /**
    * Archive Procedure(
    * @param {string} instId
    * @returns
    */
    archiveProcedure(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "EntityProcedureApi/Archive", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Add Immunization
      * @param {string} entId
      * @param {Object} immunization
      * @returns
      */
    addImmunization(entId: string, immunization: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: immunization
        });

        return this.http.post(this.apiUrl + "EntityImmunizationApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update Immunization
      * @param {string} insId
      * @param {Object} immunization
      * @returns
      */
    updateImmunization(insId: string, immunization: Object) {
        let body = JSON.stringify({
            Key: { InstanceId: insId },
            Values: immunization
        });

        return this.http.post(this.apiUrl + "EntityImmunizationApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }


    /**
    * Archive Immunization(
    * @param {string} instId
    * @returns
    */
    archiveImmunization(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "EntityImmunizationApi/Archive", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Add Incident
    * @param {string} entId
    * @param {Object} incident
    * @returns
    */
    addIncident(entId: string, incident: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: incident
        });

        return this.http.post(this.apiUrl + "EntityIncidentApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update Incident
      * @param {string} insId
      * @param {Object} incident
      * @returns
      */
    updateIncident(insId: string, incident: Object) {
        let body = JSON.stringify({
            Key: { InstanceId: insId },
            Values: incident
        });

        return this.http.post(this.apiUrl + "EntityIncidentApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }


    /**
    * Archive Incident(
    * @param {string} instId
    * @returns
    */
    archiveIncident(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "EntityIncidentApi/Archive", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Add condition
    * @param {string} entId
    * @param {Object} condition
    * @returns
    */
    addCondition(entId: string, condition: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: condition
        });

        return this.http.post(this.apiUrl + "EntityConditionApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
      * Update Condition
      * @param {string} insId
      * @param {Object} condition
      * @returns
      */
    updateCondition(insId: string, condition: Object) {
        let body = JSON.stringify({
            Key: { InstanceId: insId },
            Values: condition
        });

        return this.http.post(this.apiUrl + "EntityConditionApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Archive condition
    * @param {string} instId
    * @returns
    */
    archiveCondition(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "EntityConditionApi/Archive", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Add insurance
     * @param {string} entId
     * @param {Object} insurance
     * @returns
     */
    addInsurance(entId: string, insurance: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: insurance
        });

        return this.http.post(this.apiUrl + "EntityInsuranceApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Update Insurance
     * @param {string} insId
     * @param {Object} insurance
     * @returns
     */
    updateInsurance(insId: string, insurance: Object) {
        let body = JSON.stringify({
            Key: { InstanceId: insId },
            Values: insurance
        });

        return this.http.post(this.apiUrl + "EntityInsuranceApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Archive insurance
     * @param {string} instId
     * @returns
     */
    archiveInsurance(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "EntityInsuranceApi/Archive", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
    * Archive Gov Id
    * @param {string} gvid
    * @returns
    */
    archiveGovId(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "EntityGovernmentIdentificationApi/Archive", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Add EC
     * @param {string} entId
     * @param {Object} EC
     * @returns
     */
    addEC(entId: string, ec: Object) {
        let body = JSON.stringify({
            Key: { EntityId: entId },
            Values: ec
        });

        return this.http.post(this.apiUrl + "EntityEmergencyContactApi/Add", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Update EC
     * @param {string} insId
     * @param {Object} EC
     * @returns
     */
    updateEC(insId: string, ec: Object) {
        let body = JSON.stringify({
            Key: { InstanceId: insId },
            Values: ec
        });

        return this.http.post(this.apiUrl + "EntityEmergencyContactApi/Update", body, this.options)
            .map(res => res.json())
            .catch(this.logAndPassOn);
    }

    /**
     * Archive EC
     * @param {string} instId
     * @returns
     */
    archiveEC(instId: string) {
        let body = JSON.stringify({
            Key: { InstanceId: instId }
        });

        return this.http.post(this.apiUrl + "EntityEmergencyContactApi/Archive", body, this.options)
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
