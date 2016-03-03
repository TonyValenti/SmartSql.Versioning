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
    public partial class EntityGovernmentIdentificationController : EntityListMemberController<EntityGovernmentIdentificationInstance, EntityGovernmentIdentification> {

    }

    public partial class EntityGovernmentIdentificationInstance : Instance<EntityGovernmentIdentification> {

    }

    public partial class EntityGovernmentIdentification : EntityRevision<EntityGovernmentIdentificationInstance> {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityGovernmentIdentificationInstance> EntityGovernmentIdentificationInstances { get; set; }
        public DbSet<EntityGovernmentIdentification> EntityGovernmentIdentifications { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityGovernmentIdentificationParameters {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public class EntityGovernmentIdentificationResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Value { get; set; }
    }


    public class EntityGovernmentIdentificationApiController : EntityListMemberApiController<
      EntityGovernmentIdentificationController,
      EntityGovernmentIdentificationInstance, EntityGovernmentIdentification,
      EntityGovernmentIdentificationParameters, EntityGovernmentIdentificationParameters,
      EntityGovernmentIdentificationResponse
      > {

    }
}
