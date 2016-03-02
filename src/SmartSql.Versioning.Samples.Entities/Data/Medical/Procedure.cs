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
    public partial class EntityProcedureController : EntityListMemberController<EntityProcedureInstance, EntityProcedure> {

    }

    public partial class EntityProcedureInstance : Instance<EntityProcedure> {

    }

    public partial class EntityProcedure : EntityRevision<EntityProcedureInstance> {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
    }

    public partial class EntityDataContext : DbContext {

        public DbSet<EntityProcedureInstance> EntityProcedureInstances { get; set; }
        public DbSet<EntityProcedure> EntityProcedures { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityProcedureParameters {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
    }

    public class EntityProcedureResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime? Date { get; set; }
    }


    public class EntityProcedureApiController : EntityListMemberApiController<
      EntityProcedureController,
      EntityProcedureInstance, EntityProcedure,
      EntityProcedureParameters, EntityProcedureParameters,
      EntityProcedureResponse
      > {

    }

}
