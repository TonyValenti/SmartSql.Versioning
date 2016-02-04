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
    public partial class ProcedureController : EntityListMemberController<ProcedureInstance, Procedure> {

    }

    public partial class ProcedureInstance : Instance<Procedure> {

    }

    public partial class Procedure : EntityRevision<ProcedureInstance> {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }

    public partial class DataContext : DbContext {

        public DbSet<ProcedureInstance> Procedure { get; set; }
        public DbSet<Procedure> ProcedureRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class ProcedureParameters {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }

    public class ProcedureResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
    }


    public class ProcedureApiController : EntityListMemberApiController<
      ProcedureController,
      ProcedureInstance, Procedure,
      ProcedureParameters, ProcedureParameters,
      ProcedureResponse
      > {

    }

}
