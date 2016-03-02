using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using System.Web.Http;

using SmartSql.Versioning;
using System.Collections;

namespace SmartSql.Versioning.Samples.Entities.Data {

    public class EntityParameters {
        public string Name { get; set; }
    }

    public class EntityResponse : CommonResponse {
        public string Name { get; set; }
    }


    public class EntityApiController :  ApiController<
            EntityDataContext, EntityController,

            EntityInstance, Entity,
            EntityParameters, EntityParameters,
            EntityResponse
        > {

        protected override bool CanUpdate(UpdateRequest<InstanceIdParameters, EntityParameters> Operation) {
            return HasPermission(Operation.Key.InstanceId);
        }

        protected override bool CanGet(GetRequest<InstanceIdParameters> Operation) {
            return HasPermission(Operation.Key.InstanceId);
        }

        protected override bool CanArchive(ArchiveRequest<InstanceIdParameters> Operation) {
            return HasPermission(Operation.Key.InstanceId);
        }

        protected override bool CanRestore(RestoreRequest<InstanceIdParameters> Operation) {
            return HasPermission(Operation.Key.InstanceId);
        }

        protected override bool CanHistory(HistoryRequest<InstanceIdParameters> Operation) {
            return HasPermission(Operation.Key.InstanceId);
        }

        private bool HasPermission(Guid EntityInstanceId) {
            var ret = false;

            if (EntityInstanceId != null) {
                if (DataController.Get(EntityInstanceId) != null) {
                    ret = true;
                }
            }

            return ret;
        }

        protected override IList List(ListRequest<EmptyParameters> Operation) {
            var OwnerUserId = SmartSql.Versioning.Samples.Entities.Framework.Shell.UserId;

            return DataController.All()
                .Where(x => x.OwnerUserId == OwnerUserId)
                .ToList();
        }

        public EntityApiController() {
            var UserId = SmartSql.Versioning.Samples.Entities.Framework.Shell.UserId;
            DataController.Default_Author = new GuidUserAuthor(UserId);
            DataController.Default_OwnerUserId = UserId;
        }


        [HttpPost]
        [ActionName("Details")]
        public virtual EntityDetailsResponse DetailsWebMethod(GetRequest<InstanceIdParameters> Operation) {
            EntityDetailsResponse ret = null;

            if (CanGet(Operation)) {
                ret = EntityDetailsResponse.FromEntityId(Operation.Key.InstanceId);

            }

            return ret;
        }

        private object Unwrap(object Source) {
            var ret = Source;
           

            return ret;
        }

    }


    public partial class EntityDetailsResponse {

        public static EntityDetailsResponse FromEntityId(Guid EntityInstanceId) {
            var ret = new EntityDetailsResponse();

            var ItemRequest = new GetRequest<InstanceIdParameters>();
            ItemRequest.Key = new InstanceIdParameters();
            ItemRequest.Key.InstanceId = EntityInstanceId;

            var ChildItemRequest = new GetRequest<EntityIdParameters>();
            ChildItemRequest.Key = new EntityIdParameters();
            ChildItemRequest.Key.EntityId = EntityInstanceId;

            var ChildListRequest = new ListRequest<EntityIdParameters>();
            ChildListRequest.Key = new EntityIdParameters();
            ChildListRequest.Key.EntityId = EntityInstanceId;


            ret.Entity = new EntityApiController().GetWebMethod(ItemRequest);

            //These items are in the order in which they appear in the Solution Explorer.

            ret.BeltSize = new EntityBeltSizeApiController().GetWebMethod(ChildItemRequest);
            ret.BraSize = new EntityBraSizeApiController().GetWebMethod(ChildItemRequest);
            ret.DressSize = new DressSizeApiController().GetWebMethod(ChildItemRequest);
            ret.HeadSize = new EntityHeadSizeApiController().GetWebMethod(ChildItemRequest);
            ret.PantSize = new EntityPantSizeApiController().GetWebMethod(ChildItemRequest);
            ret.ShirtSize = new EntityShirtSizeApiController().GetWebMethod(ChildItemRequest);
            ret.ShoeSize = new EntityShoeSizeApiController().GetWebMethod(ChildItemRequest);
            ret.UnderwearSize = new EntityUnderwearSizeApiController().GetWebMethod(ChildItemRequest);

            ret.Address = new EntityAddressApiController().ListWebMethod(ChildListRequest);
            ret.Email = new EntityEmailAddressApiController().ListWebMethod(ChildListRequest);
            ret.PhoneNumber = new EntityPhoneNumberApiController().ListWebMethod(ChildListRequest);

            ret.Certification = new EntityCertificationApiController().ListWebMethod(ChildListRequest);
            ret.EducationLevel = new EntityEducationLevelApiController().GetWebMethod(ChildItemRequest);

            ret.BankAccount = new EntityBankAccountApiController().ListWebMethod(ChildListRequest);

            ret.DateOfBirth = new EntityDateOfBirthApiController().GetWebMethod(ChildItemRequest);
            ret.Ethnicity = new EntityEthnicityApiController().GetWebMethod(ChildItemRequest);
            ret.EyeColor = new EntityEyeColorApiController().GetWebMethod(ChildItemRequest);
            ret.GovernmentIdentification = new EntityGovernmentIdentificationApiController().ListWebMethod(ChildListRequest);
            ret.HairColor = new EntityHairColorApiController().GetWebMethod(ChildItemRequest);
            ret.Height = new EntityHeightApiController().GetWebMethod(ChildItemRequest);
            ret.Weight = new EntityWeightApiController().GetWebMethod(ChildItemRequest);

            ret.Like = new EntityLikeApiController().ListWebMethod(ChildListRequest);

            ret.Allergy = new EntityAllergyApiController().ListWebMethod(ChildListRequest);
            ret.BloodType = new EntityBloodTypeApiController().GetWebMethod(ChildItemRequest);
            ret.Condition = new EntityConditionApiController().ListWebMethod(ChildListRequest);
            ret.EmergencyContact = new EntityEmergencyContactApiController().ListWebMethod(ChildListRequest);
            ret.Immunization = new EntityImmunizationApiController().ListWebMethod(ChildListRequest);
            ret.Incident = new EntityIncidentApiController().ListWebMethod(ChildListRequest);
            ret.Insurance = new EntityInsuranceApiController().ListWebMethod(ChildListRequest);
            ret.Medication = new EntityMedicationApiController().ListWebMethod(ChildListRequest);
            ret.Procedure = new EntityProcedureApiController().ListWebMethod(ChildListRequest);
            ret.Sex = new EntitySexApiController().GetWebMethod(ChildItemRequest);

            ret.AngerLanguage = new EntityAngerLanguageApiController().GetWebMethod(ChildItemRequest);
            ret.BriggsMyers = new EntityBriggsMyersApiController().GetWebMethod(ChildItemRequest);
            ret.LoveLanguage = new EntityLoveLanguageApiController().GetWebMethod(ChildItemRequest);
            ret.PoliticalAffiliation = new EntityPoliticalAffiliationApiController().GetWebMethod(ChildItemRequest);
            ret.Religion = new EntityReligionApiController().GetWebMethod(ChildItemRequest);
            ret.ReligiousFrequency = new EntityReligiousFrequencyApiController().GetWebMethod(ChildItemRequest);
            ret.SexualOrientation = new EntitySexualOrientationApiController().GetWebMethod(ChildItemRequest);

            

            return ret;

        }


        //These items are in the order in which they appear in the Solution Explorer.

        public EntityBeltSizeResponse BeltSize { get; set; }
        public EntityBraSizeResponse BraSize { get; set; }
        public EntityDressSizeResponse DressSize { get; set; }
        public EntityHeadSizeResponse HeadSize { get; set; }
        public EntityPantSizeResponse PantSize { get; set; }
        public EntityShirtSizeResponse ShirtSize { get; set; }
        public EntityShoeSizeResponse ShoeSize { get; set; }
        public EntityUnderwearSizeResponse UnderwearSize { get; set; }

        public List<EntityAddressResponse> Address { get; set; }
        public List<EntityEmailAddressResponse> Email { get; set; }
        public List<EntityPhoneNumberResponse> PhoneNumber { get; set; }

        public List<EntityCertificationResponse> Certification { get; set; }
        public List<EntityDegreeResponse> Degree { get; set; }
        public EntityEducationLevelResponse EducationLevel { get; set; }
        public List<EntitySchoolResponse> School { get; set; }

        public EntityResponse Entity { get; set; }

        public List<EntityBankAccountResponse> BankAccount { get; set; }

        public EntityDateOfBirthResponse DateOfBirth { get; set; }
        public EntityEthnicityResponse Ethnicity { get; set; }
        public EntityEyeColorResponse EyeColor { get; set; }
        public List<EntityGovernmentIdentificationResponse> GovernmentIdentification { get; set; }
        public EntityHairColorResponse HairColor { get; set; }
        public EntityHeightResponse Height { get; set; }
        public EntityWeightResponse Weight { get; set; }
        
        public List<EntityLikeResponse> Like { get; set; }

        public List<EntityAllergyResponse> Allergy { get; set; }
        public EntityBloodTypeResponse BloodType { get; set; }
        public List<EntityConditionResponse> Condition { get; set; }
        public List<EntityEmergencyContactResponse> EmergencyContact { get; set; }
        public List<EntityImmunizationResponse> Immunization { get; set; }
        public List<EntityIncidentResponse> Incident { get; set; }
        public List<EntityInsuranceResponse> Insurance { get; set; }
        public List<EntityMedicationResponse> Medication { get; set; }
        public List<EntityProcedureResponse> Procedure { get; set; }
        public EntitySexResponse Sex { get; set; }

        public EntityAngerLanguageResponse AngerLanguage { get; set; }
        public EntityBriggsMyersResponse BriggsMyers { get; set; }
        public EntityLoveLanguageResponse LoveLanguage { get; set; }
        public EntityPoliticalAffiliationResponse PoliticalAffiliation { get; set; }
        public EntityReligionResponse Religion { get; set; }
        public EntityReligiousFrequencyResponse ReligiousFrequency { get; set; }
        public EntitySexualOrientationResponse SexualOrientation { get; set; }
        

    }



}
