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
    var MedicalSvc;
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
            MedicalSvc = (function () {
                function MedicalSvc(http) {
                    this.http = http;
                    this.apiUrl = "http://localhost:47503/api/";
                    this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    this.options = new http_1.RequestOptions({ headers: this.headers });
                }
                /**
                 * Add Sex
                 * @param {string} sex
                 * @returns
                 */
                MedicalSvc.prototype.addSex = function (entId, sex) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: sex }
                    });
                    return this.http.post(this.apiUrl + "SexApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                 * Edit Sex
                 * @param {string} sex
                 * @returns
                 */
                MedicalSvc.prototype.updateSex = function (entId, sex) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: sex }
                    });
                    return this.http.post(this.apiUrl + "BloodTypeApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Add blood type
                * @param {string} bt
                * @returns
                */
                MedicalSvc.prototype.addBloodType = function (entId, bt) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: bt }
                    });
                    return this.http.post(this.apiUrl + "BloodTypeApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                 * Edit blood type
                 * @param {string} bt
                 * @returns
                 */
                MedicalSvc.prototype.updateBloodType = function (entId, bt) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: { Value: bt }
                    });
                    return this.http.post(this.apiUrl + "BloodTypeApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                 * Add height
                 * @param {string} entId
                 * @param {number} unit
                 * @param {number} value
                 * @returns
                 */
                MedicalSvc.prototype.addHeight = function (entId, unit, value) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: {
                            Value: value,
                            Unit: unit
                        }
                    });
                    return this.http.post(this.apiUrl + "HeightApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Update height
                  * @param {string} entId
                  * @param {number} unit
                  * @param {number} value
                  * @returns
                  */
                MedicalSvc.prototype.updateHeight = function (entId, unit, value) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: {
                            Value: value,
                            Unit: unit
                        }
                    });
                    return this.http.post(this.apiUrl + "HeightApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Add weight
                * @param {string} entId
                * @param {number} unit
                * @param {number} value
                * @returns
                */
                MedicalSvc.prototype.addWeight = function (entId, unit, value) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: {
                            Value: value,
                            Unit: unit
                        }
                    });
                    return this.http.post(this.apiUrl + "WeightApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Update weight
                  * @param {string} entId
                  * @param {number} unit
                  * @param {number} value
                  * @returns
                  */
                MedicalSvc.prototype.updateWeight = function (entId, unit, value) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: {
                            Value: value,
                            Unit: unit
                        }
                    });
                    return this.http.post(this.apiUrl + "WeightApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                 * Add allergy
                 * @param {string} entId
                 * @param {Object} allergy
                 * @returns
                 */
                MedicalSvc.prototype.addAllergy = function (entId, allergy) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: allergy
                    });
                    return this.http.post(this.apiUrl + "AllergyApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Update allergy
                  * @param {string} insId
                  * @param {Object} allergy
                  * @returns
                  */
                MedicalSvc.prototype.updateAllergy = function (insId, allergy) {
                    var body = JSON.stringify({
                        Key: { instanceId: insId },
                        Values: allergy
                    });
                    return this.http.post(this.apiUrl + "AllergyApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Archive Allergy
                * @param {string} instId
                * @returns
                */
                MedicalSvc.prototype.archiveAllergy = function (instId) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId }
                    });
                    return this.http.post(this.apiUrl + "AllergyApi/Archive", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Add Medication
                * @param {string} entId
                * @param {Object} medication
                * @returns
                */
                MedicalSvc.prototype.addMedication = function (entId, medication) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: medication
                    });
                    return this.http.post(this.apiUrl + "MedicationApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Update allergyMedication
                  * @param {string} insId
                  * @param {Object} medication
                  * @returns
                  */
                MedicalSvc.prototype.updateMedication = function (insId, medication) {
                    var body = JSON.stringify({
                        Key: { instanceId: insId },
                        Values: medication
                    });
                    return this.http.post(this.apiUrl + "MedicationApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Archive Medication
                * @param {string} instId
                * @returns
                */
                MedicalSvc.prototype.archiveMedication = function (instId) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId }
                    });
                    return this.http.post(this.apiUrl + "MedicationApi/Archive", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Add Procedure
                * @param {string} entId
                * @param {Object} procedure
                * @returns
                */
                MedicalSvc.prototype.addProcedure = function (entId, procedure) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: procedure
                    });
                    return this.http.post(this.apiUrl + "ProcedureApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Update Procedure
                  * @param {string} insId
                  * @param {Object} procedure
                  * @returns
                  */
                MedicalSvc.prototype.updateProcedure = function (insId, procedure) {
                    var body = JSON.stringify({
                        Key: { instanceId: insId },
                        Values: procedure
                    });
                    return this.http.post(this.apiUrl + "ProcedureApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Archive Procedure(
                * @param {string} instId
                * @returns
                */
                MedicalSvc.prototype.archiveProcedure = function (instId) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId }
                    });
                    return this.http.post(this.apiUrl + "ProcedureApi/Archive", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Add Immunization
                  * @param {string} entId
                  * @param {Object} immunization
                  * @returns
                  */
                MedicalSvc.prototype.addImmunization = function (entId, immunization) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: immunization
                    });
                    return this.http.post(this.apiUrl + "ImmunizationApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Update Immunization
                  * @param {string} insId
                  * @param {Object} immunization
                  * @returns
                  */
                MedicalSvc.prototype.updateImmunization = function (insId, immunization) {
                    var body = JSON.stringify({
                        Key: { instanceId: insId },
                        Values: immunization
                    });
                    return this.http.post(this.apiUrl + "ImmunizationApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Archive Immunization(
                * @param {string} instId
                * @returns
                */
                MedicalSvc.prototype.archiveImmunization = function (instId) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId }
                    });
                    return this.http.post(this.apiUrl + "ImmunizationApi/Archive", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Add Incident
                * @param {string} entId
                * @param {Object} incident
                * @returns
                */
                MedicalSvc.prototype.addIncident = function (entId, incident) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: incident
                    });
                    return this.http.post(this.apiUrl + "IncidentApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Update Incident
                  * @param {string} insId
                  * @param {Object} incident
                  * @returns
                  */
                MedicalSvc.prototype.updateIncident = function (insId, incident) {
                    var body = JSON.stringify({
                        Key: { instanceId: insId },
                        Values: incident
                    });
                    return this.http.post(this.apiUrl + "IncidentApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Archive Incident(
                * @param {string} instId
                * @returns
                */
                MedicalSvc.prototype.archiveIncident = function (instId) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId }
                    });
                    return this.http.post(this.apiUrl + "IncidentApi/Archive", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Add condition
                * @param {string} entId
                * @param {Object} condition
                * @returns
                */
                MedicalSvc.prototype.addCondition = function (entId, condition) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: condition
                    });
                    return this.http.post(this.apiUrl + "ConditionApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Update Condition
                  * @param {string} insId
                  * @param {Object} condition
                  * @returns
                  */
                MedicalSvc.prototype.updateCondition = function (insId, condition) {
                    var body = JSON.stringify({
                        Key: { instanceId: insId },
                        Values: condition
                    });
                    return this.http.post(this.apiUrl + "ConditionApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Archive condition
                * @param {string} instId
                * @returns
                */
                MedicalSvc.prototype.archiveCondition = function (instId) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId }
                    });
                    return this.http.post(this.apiUrl + "ConditionApi/Archive", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
               * Add insurance
               * @param {string} entId
               * @param {Object} insurance
               * @returns
               */
                MedicalSvc.prototype.addInsurance = function (entId, insurance) {
                    var body = JSON.stringify({
                        Key: { EntityId: entId },
                        Values: insurance
                    });
                    return this.http.post(this.apiUrl + "InsuranceApi/Add", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                  * Update Insurance
                  * @param {string} insId
                  * @param {Object} insurance
                  * @returns
                  */
                MedicalSvc.prototype.updateInsurance = function (insId, insurance) {
                    var body = JSON.stringify({
                        Key: { instanceId: insId },
                        Values: insurance
                    });
                    return this.http.post(this.apiUrl + "InsuranceApi/Update", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Archive insurance
                * @param {string} instId
                * @returns
                */
                MedicalSvc.prototype.archiveInsurance = function (instId) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId }
                    });
                    return this.http.post(this.apiUrl + "InsuranceApi/Archive", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                /**
                * Archive Gov Id
                * @param {string} gvid
                * @returns
                */
                MedicalSvc.prototype.archiveGovId = function (instId) {
                    var body = JSON.stringify({
                        Key: { InstanceId: instId }
                    });
                    return this.http.post(this.apiUrl + "GovernmentIdentificationApi/Archive", body, this.options)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                MedicalSvc.prototype.logAndPassOn = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error);
                };
                MedicalSvc = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], MedicalSvc);
                return MedicalSvc;
            })();
            exports_1("MedicalSvc", MedicalSvc);
        }
    }
});
//# sourceMappingURL=Medical.service.js.map