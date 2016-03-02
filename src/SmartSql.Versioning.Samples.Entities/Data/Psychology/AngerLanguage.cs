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
    public partial class EntityAngerLanguageController : EntityValueMemberController<EntityAngerLanguageInstance, EntityAngerLanguage> {

    }

    public partial class EntityAngerLanguageInstance : Instance<EntityAngerLanguage> {

    }

    public partial class EntityAngerLanguage : EntityRevision<EntityAngerLanguageInstance> {
        public bool HasAvoidant { get; set; }
        public bool HasDirect { get; set; }
        public bool HasPassiveAggressive { get; set; }
        public bool HasReactive { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityAngerLanguageInstance> EntityAngerLanguageInstances { get; set; }
        public DbSet<EntityAngerLanguage> EntityAngerLanguages { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityAngerLanguageParameters {
        public bool HasAvoidant { get; set; }
        public bool HasDirect { get; set; }
        public bool HasPassiveAggressive { get; set; }
        public bool HasReactive { get; set; }
    }

    public class EntityAngerLanguageResponse : EntityMemberResponse {
        public bool HasAvoidant { get; set; }
        public bool HasAssertive { get; set; }
        public bool HasPassiveAggressive { get; set; }
        public bool HasReactive { get; set; }
    }


    public class EntityAngerLanguageApiController : EntityValueMemberApiController<
      EntityAngerLanguageController,
      EntityAngerLanguageInstance, EntityAngerLanguage,
      EntityAngerLanguageParameters, EntityAngerLanguageParameters,
      EntityAngerLanguageResponse
      > {

    }
}
