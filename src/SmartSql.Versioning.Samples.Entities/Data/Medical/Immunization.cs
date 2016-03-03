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
    public partial class EntityImmunizationController : EntityListMemberController<EntityImmunizationInstance, EntityImmunization> {

    }

    public partial class EntityImmunizationInstance : Instance<EntityImmunization> {

    }

    public partial class EntityImmunization : EntityRevision<EntityImmunizationInstance> {
        public string Name { get; set; }
        public DateTime? Date { get; set; }
    }

    public partial class EntityDataContext : DbContext {

        public DbSet<EntityImmunizationInstance> EntityImmunizationInstances { get; set; }
        public DbSet<EntityImmunization> EntityImmunizations { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityImmunizationParameters {
        public string Name { get; set; }
        public DateTime? Date { get; set; }
    }

    public class EntityImmunizationResponse : EntityMemberResponse {
        public string Name { get; set; }
        public DateTime? Date { get; set; }
    }


    public class EntityImmunizationApiController : EntityListMemberApiController<
      EntityImmunizationController,
      EntityImmunizationInstance, EntityImmunization,
      EntityImmunizationParameters, EntityImmunizationParameters,
      EntityImmunizationResponse
      > {

    }

}
