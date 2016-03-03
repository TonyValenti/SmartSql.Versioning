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
    public partial class EntityIncidentController : EntityListMemberController<EntityIncidentInstance, EntityIncident> {

    }

    public partial class EntityIncidentInstance : Instance<EntityIncident> {

    }

    public partial class EntityIncident : EntityRevision<EntityIncidentInstance> {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
    }

    public partial class EntityDataContext : DbContext {

        public DbSet<EntityIncidentInstance> EntityIncidentInstances { get; set; }
        public DbSet<EntityIncident> EntityIncidents { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityIncidentParameters {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
    }

    public class EntityIncidentResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
    }


    public class EntityIncidentApiController : EntityListMemberApiController<
      EntityIncidentController,
      EntityIncidentInstance, EntityIncident,
      EntityIncidentParameters, EntityIncidentParameters,
      EntityIncidentResponse
      > {

    }
}
