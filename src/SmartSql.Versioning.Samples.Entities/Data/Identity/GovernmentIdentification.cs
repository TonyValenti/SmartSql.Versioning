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
    public partial class GovernmentIdentificationController : EntityListMemberController<GovernmentIdentificationInstance, GovernmentIdentification> {

    }

    public partial class GovernmentIdentificationInstance : Instance<GovernmentIdentification> {

    }

    public partial class GovernmentIdentification : EntityRevision<GovernmentIdentificationInstance> {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<GovernmentIdentificationInstance> GovernmentIdentification { get; set; }
        public DbSet<GovernmentIdentification> GovernmentIdentificationRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class GovernmentIdentificationParameters {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public class GovernmentIdentificationResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Value { get; set; }
    }


    public class GovernmentIdentificationApiController : EntityListMemberApiController<
      GovernmentIdentificationController,
      GovernmentIdentificationInstance, GovernmentIdentification,
      GovernmentIdentificationParameters, GovernmentIdentificationParameters,
      GovernmentIdentificationResponse
      > {

    }
}
