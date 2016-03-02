using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using SmartSql.Versioning;

namespace SmartSql.Versioning.Samples.Entities.Data {
    //Data Access--------------------------------------------
    public partial class EntityLoveLanguageController : EntityValueMemberController<EntityLoveLanguageInstance, EntityLoveLanguage> {

    }

    public partial class EntityLoveLanguageInstance : Instance<EntityLoveLanguage> {

    }

    public partial class EntityLoveLanguage : EntityRevision<EntityLoveLanguageInstance> {
        public bool HasWordsOfAffirmation { get; set; }
        public bool HasActsOfService { get; set; }
        public bool HasReceivingGifts { get; set; }
        public bool HasQualityTime { get; set; }
        public bool HasPhysicalTouch { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityLoveLanguageInstance> EntityLoveLanguageInstances { get; set; }
        public DbSet<EntityLoveLanguage> EntityLoveLanguages { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityLoveLanguageParameters {
        public bool HasWordsOfAffirmation { get; set; }
        public bool HasActsOfService { get; set; }
        public bool HasReceivingGifts { get; set; }
        public bool HasQualityTime { get; set; }
        public bool HasPhysicalTouch { get; set; }
    }

    public class EntityLoveLanguageResponse : EntityMemberResponse {
        public bool HasWordsOfAffirmation { get; set; }
        public bool HasActsOfService { get; set; }
        public bool HasReceivingGifts { get; set; }
        public bool HasQualityTime { get; set; }
        public bool HasPhysicalTouch { get; set; }
    }


    public class EntityLoveLanguageApiController : EntityValueMemberApiController<
      EntityLoveLanguageController,
      EntityLoveLanguageInstance, EntityLoveLanguage,
      EntityLoveLanguageParameters, EntityLoveLanguageParameters,
      EntityLoveLanguageResponse
      > {

    }
}
