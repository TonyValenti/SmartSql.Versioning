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
    public partial class IncidentController : EntityListMemberController<IncidentInstance, Incident> {

    }

    public partial class IncidentInstance : Instance<Incident> {

    }

    public partial class Incident : EntityRevision<IncidentInstance> {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }

    public partial class DataContext : DbContext {

        public DbSet<IncidentInstance> Incident { get; set; }
        public DbSet<Incident> IncidentRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class IncidentParameters {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }

    public class IncidentResponse : CommonResponse {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }


    public class IncidentApiController : EntityListMemberApiController<
      IncidentController,
      IncidentInstance, Incident,
      IncidentParameters, IncidentParameters,
      IncidentResponse
      > {

    }
}
