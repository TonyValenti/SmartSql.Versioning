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
    public partial class EntityPoliticalAffiliationController : EntityValueMemberController<EntityPoliticalAffiliationInstance, EntityPoliticalAffiliation> {

    }

    public partial class EntityPoliticalAffiliationInstance : Instance<EntityPoliticalAffiliation> {

    }

    public partial class EntityPoliticalAffiliation : EntityRevision<EntityPoliticalAffiliationInstance, String> {
        
    }

    public partial class EntityDataContext : DbContext  {
        public DbSet<EntityPoliticalAffiliationInstance> EntityPoliticalAffiliationInstances { get; set; }
        public DbSet<EntityPoliticalAffiliation> EntityPoliticalAffiliations { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityPoliticalAffiliationParameters : ValueParameter<String> {

    }

    public class EntityPoliticalAffiliationResponse : EntityMemberResponse<String> {

    }

    public class EntityPoliticalAffiliationApiController : EntityValueMemberApiController<
      EntityPoliticalAffiliationController,
      EntityPoliticalAffiliationInstance, EntityPoliticalAffiliation,
      EntityPoliticalAffiliationParameters, EntityPoliticalAffiliationParameters,
      EntityPoliticalAffiliationResponse
      > {

    }
}
