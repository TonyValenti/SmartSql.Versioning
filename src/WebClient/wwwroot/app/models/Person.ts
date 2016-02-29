
import {eyeColors} from './eyeColors';
import {hairColors} from './hairColors';
import {ClothingSizes} from './ClothingSizes';
import {Financial} from './Financial'

export class Person {
    constructor(
        public name: string,
        public instanceId: string,
        public isArchived: boolean,
        public isCurrent: boolean,
        public isOriginal: boolean,
        public dob: string,
        public photo: string,
        public eyeColor: any,
        public hairColor: any,
        public ethnicity: string,
        public governmentId: any,
        public clothingSizes: ClothingSizes,
        public likes: any,
        public dislikes: any,
        public sex: number,
        public bloodType: number,
        public height: any,
        public weight: any,
        public allergies: any,
        public medications: any,
        public procedures: any,
        public immunizations: any,
        public incidents: any,
        public conditions: any,
        public insurances: any,
        public emContacts: any,
        public financials: Financial[],
        public psychology: any,
        public education: any
    ) { }

    static createRPerson(pjsn) {

        let insurances = [];
        let conditions = [];
        let immunizations = [];
        let incidents = [];
        let allergies = [];
        let medications = [];
        let procedures = [];
        let likes = [];
        let dislikes = [];
        let governmentIds = [];
        let bankAcc: Financial[] = [];

        if (pjsn.BankAccount && pjsn.BankAccount.length) {
            for (let f of pjsn.BankAccount) {
                bankAcc.push(new Financial(
                    f.Name,
                    f.AccountNumber,
                    f.Description,
                    f.Institution,
                    f.InstanceId));
            }
        }
               
        // Gov ids
        for (var i = 0; i < pjsn.GovernmentIdentification.length; i++) {
            governmentIds.push({
                name: pjsn.GovernmentIdentification[i].Name,
                value: pjsn.GovernmentIdentification[i].Value,
                instanceId: pjsn.GovernmentIdentification[i].InstanceId
            });
        }
       
        // Likes
        for (var i = 0; i < pjsn.Like.length; i++) {
            if (pjsn.Like[i].Status) {
                likes.push({
                    status: pjsn.Like[i].Status,
                    category: pjsn.Like[i].Category,
                    instanceId: pjsn.Like[i].InstanceId,
                    value: pjsn.Like[i].Value
                });
            } else {
                dislikes.push({
                    status: pjsn.Like[i].Status,
                    category: pjsn.Like[i].Category,
                    instanceId: pjsn.Like[i].InstanceId,
                    value: pjsn.Like[i].Value
                });
            }
        }
         
        // Allergies
        for (var i = 0; i < pjsn.Allergy.length; i++) {
            allergies.push({
                name: pjsn.Allergy[i].Name,
                treatment: pjsn.Allergy[i].Treatment,
                instanceId: pjsn.Allergy[i].InstanceId
            });
        }

        // Medications
        for (var i = 0; i < pjsn.Medication.length; i++) {
            medications.push({
                name: pjsn.Medication[i].Name,
                description: pjsn.Medication[i].Description,
                usageText: pjsn.Medication[i].UsageText,
                instanceId: pjsn.Medication[i].InstanceId
            });
        }

        // Procedures
        for (var i = 0; i < pjsn.Procedure.length; i++) {
            procedures.push({
                Name: pjsn.Procedure[i].Name,
                Description: pjsn.Procedure[i].Description,
                Date: pjsn.Procedure[i].Date && new Date(pjsn.Procedure[i].Date).toISOString().split("T")[0],
                InstanceId: pjsn.Procedure[i].InstanceId
            });
        }

        // Immunization
        for (var i = 0; i < pjsn.Immunization.length; i++) {
            immunizations.push({
                Name: pjsn.Immunization[i].Name,
                Date: pjsn.Immunization[i].Date && new Date(pjsn.Immunization[i].Date).toISOString().split("T")[0],
                InstanceId: pjsn.Immunization[i].InstanceId
            });
        }
         
        // Incident
        for (var i = 0; i < pjsn.Incident.length; i++) {
            incidents.push({
                Name: pjsn.Incident[i].Name,
                Description: pjsn.Incident[i].Description,
                Date: pjsn.Incident[i].Date && new Date(pjsn.Incident[i].Date).toISOString().split("T")[0],
                InstanceId: pjsn.Incident[i].InstanceId
            });
        }

        // Condition
        for (var i = 0; i < pjsn.Condition.length; i++) {
            conditions.push({
                Name: pjsn.Condition[i].Name,
                Description: pjsn.Condition[i].Description,
                InstanceId: pjsn.Condition[i].InstanceId
            });
        }

        // Insurance
        for (var i = 0; i < pjsn.Insurance.length; i++) {
            insurances.push({
                Name: pjsn.Insurance[i].Name,
                Details: pjsn.Insurance[i].Details,
                InstanceId: pjsn.Insurance[i].InstanceId
            });
        }

        var clothessizes = new ClothingSizes(
            pjsn.BeltSize && pjsn.BeltSize.Value,
            pjsn.PantSize && pjsn.PantSize.Value,
            pjsn.ShoeSize && pjsn.ShoeSize.Value,
            pjsn.BeltSize && pjsn.BeltSize.Value,
            pjsn.HeadSize && pjsn.HeadSize.Value,
            pjsn.DressSize && pjsn.DressSize.Value);


        var psychology = {
            Religion: pjsn.Religion && pjsn.Religion.Value,
            ReligiousFrequency: pjsn.ReligiousFrequency && pjsn.ReligiousFrequency.Value,
            PoliticalAffiliation: pjsn.PoliticalAffiliation && pjsn.PoliticalAffiliation.Value,
            LoveLanguage: {
                wof: pjsn.LoveLanguage && pjsn.LoveLanguage.HasWordsOfAffirmation || null,
                aos: pjsn.LoveLanguage && pjsn.LoveLanguage.HasActsOfService || null,
                rg: pjsn.LoveLanguage && pjsn.LoveLanguage.HasReceivingGifts || null,
                qt: pjsn.LoveLanguage && pjsn.LoveLanguage.HasQualityTime || null,
                pt: pjsn.LoveLanguage && pjsn.LoveLanguage.HasPhysicalTouch || null
            },
            AngerLanguage: {
                r: pjsn.LoveLanguageAngerLanguage && pjsn.AngerLanguage.HasReactive || null,
                pa: pjsn.AngerLanguage && pjsn.AngerLanguage.HasPassiveAggressive || null,
                av: pjsn.AngerLanguage && pjsn.AngerLanguage.HasAvoidant || null,
                d: pjsn.AngerLanguage && pjsn.AngerLanguage.HasDirect || null,
            }
        }

        // EDUCATION
        var education = {
            EducationLevel: pjsn.EducationLevel && pjsn.EducationLevel.Value,
            Certification : []  
        }
 
        for (var i = 0; i < pjsn.Certification.length; i++) {
            pjsn.Certification[i].StartDate = new Date(pjsn.Certification[i].StartDate).toISOString().split("T")[0];
            pjsn.Certification[i].EndDate = new Date(pjsn.Certification[i].EndDate).toISOString().split("T")[0];
        }

        education.Certification = pjsn.Certification;

        return new Person(
            pjsn.Entity.Name,
            pjsn.Entity.InstanceId,
            pjsn.Entity.IsArchived,
            pjsn.Entity.IsCurrent,
            pjsn.Entity.IsOriginal,
            pjsn.DateOfBirth && new Date(pjsn.DateOfBirth.Value).toISOString().split("T")[0],
            null,
            pjsn.EyeColor && pjsn.EyeColor.Value,
            pjsn.HairColor && pjsn.HairColor.Value,
            pjsn.Ethnicity && pjsn.Ethnicity.Value,
            governmentIds,
            clothessizes,
            likes,
            dislikes,
            pjsn.Sex && pjsn.Sex.Value,
            pjsn.BloodType && pjsn.BloodType.Value,
            pjsn.Height ? { unit: pjsn.Height.Unit, value: pjsn.Height.Value } : { unit: 1, value: 0 },
            pjsn.Weight ? { unit: pjsn.Weight.Unit, value: pjsn.Weight.Value } : { unit: 1, value: 0 },
            allergies,
            medications,
            procedures,
            immunizations,
            incidents,
            conditions,
            insurances,
            pjsn.EmergencyContact,
            bankAcc,
            psychology,
            education
        )

    }

    initials() {
        return this.name.split(" ").length >= 2 ? this.name.split(" ")[0][0] + this.name.split(" ")[1][0] : "X"
    }
}
