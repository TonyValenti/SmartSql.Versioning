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
            DataContext, EntityController,

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


            ret.BeltSize = new BeltSizeApiController().GetWebMethod(ChildItemRequest);
            ret.DressSize = new DressSizeApiController().GetWebMethod(ChildItemRequest);
            ret.HeadSize = new HeadSizeApiController().GetWebMethod(ChildItemRequest);
            ret.PantSize = new PantSizeApiController().GetWebMethod(ChildItemRequest);
            ret.ShirtSize = new ShirtSizeApiController().GetWebMethod(ChildItemRequest);
            ret.ShoeSize = new ShoeSizeApiController().GetWebMethod(ChildItemRequest);

            ret.Address = new AddressApiController().ListWebMethod(ChildListRequest);
            ret.Email = new EmailApiController().ListWebMethod(ChildListRequest);
            ret.PhoneNumber = new PhoneNumberApiController().ListWebMethod(ChildListRequest);

            ret.Certification = new CertificationApiController().ListWebMethod(ChildListRequest);
            ret.EducationLevel = new EducationLevelApiController().GetWebMethod(ChildItemRequest);

            ret.BankAccount = new BankAccountApiController().ListWebMethod(ChildListRequest);

            ret.DateOfBirth = new DateOfBirthApiController().GetWebMethod(ChildItemRequest);
            ret.Ethnicity = new EthnicityApiController().GetWebMethod(ChildItemRequest);
            ret.EyeColor = new EyeColorApiController().GetWebMethod(ChildItemRequest);
            ret.GovernmentIdentification = new GovernmentIdentificationApiController().ListWebMethod(ChildListRequest);
            ret.HairColor = new HairColorApiController().GetWebMethod(ChildItemRequest);
            ret.Height = new HeightApiController().GetWebMethod(ChildItemRequest);
            ret.Weight = new WeightApiController().GetWebMethod(ChildItemRequest);

            ret.Like = new LikeApiController().ListWebMethod(ChildListRequest);

            ret.Allergy = new AllergyApiController().ListWebMethod(ChildListRequest);
            ret.Condition = new ConditionApiController().ListWebMethod(ChildListRequest);
            ret.EmergencyContact = new EmergencyContactApiController().ListWebMethod(ChildListRequest);
            ret.Immunization = new ImmunizationApiController().ListWebMethod(ChildListRequest);
            ret.Incident = new IncidentApiController().ListWebMethod(ChildListRequest);
            ret.Insurance = new InsuranceApiController().ListWebMethod(ChildListRequest);
            ret.Medication = new MedicationApiController().ListWebMethod(ChildListRequest);
            ret.Procedure = new ProcedureApiController().ListWebMethod(ChildListRequest);

            ret.AngerLanguage = new AngerLanguageApiController().GetWebMethod(ChildItemRequest);
            ret.BriggsMyers = new BriggsMyersApiController().GetWebMethod(ChildItemRequest);
            ret.LoveLanguage = new LoveLanguageApiController().GetWebMethod(ChildItemRequest);
            ret.Religion = new ReligionApiController().GetWebMethod(ChildItemRequest);
            ret.ReligiousFrequency = new ReligiousFrequencyApiController().GetWebMethod(ChildItemRequest);
            ret.PoliticalAffiliation = new PoliticalAffiliationApiController().GetWebMethod(ChildItemRequest);

            return ret;

        }



        public BeltSizeResponse BeltSize { get; set; }
        public DressSizeResponse DressSize { get; set; }
        public HeadSizeResponse HeadSize { get; set; }
        public PantSizeResponse PantSize { get; set; }
        public ShirtSizeResponse ShirtSize { get; set; }
        public ShoeSizeResponse ShoeSize { get; set; }

        public List<AddressResponse> Address { get; set; }
        public List<EmailResponse> Email { get; set; }
        public List<PhoneNumberResponse> PhoneNumber { get; set; }

        public List<CertificationResponse> Certification { get; set; }
        public EducationLevelResponse EducationLevel { get; set; }

        public EntityResponse Entity { get; set; }

        public List<BankAccountResponse> BankAccount { get; set; }

        public DateOfBirthResponse DateOfBirth { get; set; }
        public EthnicityResponse Ethnicity { get; set; }
        public EyeColorResponse EyeColor { get; set; }
        public List<GovernmentIdentificationResponse> GovernmentIdentification { get; set; }
        public HairColorResponse HairColor { get; set; }
        public HeightResponse Height { get; set; }
        public WeightResponse Weight { get; set; }
        
        public List<LikeResponse> Like { get; set; }

        public List<AllergyResponse> Allergy { get; set; }
        public List<ConditionResponse> Condition { get; set; }
        public List<EmergencyContactResponse> EmergencyContact { get; set; }
        public List<ImmunizationResponse> Immunization { get; set; }
        public List<IncidentResponse> Incident { get; set; }
        public List<InsuranceResponse> Insurance { get; set; }
        public List<MedicationResponse> Medication { get; set; }
        public List<ProcedureResponse> Procedure { get; set; }

        public AngerLanguageResponse AngerLanguage { get; set; }
        public BriggsMyersResponse BriggsMyers { get; set; }
        public LoveLanguageResponse LoveLanguage { get; set; }
        public ReligionResponse Religion { get; set; }
        public ReligiousFrequencyResponse ReligiousFrequency { get; set; }
        public PoliticalAffiliationResponse PoliticalAffiliation { get; set; }
    }



}
