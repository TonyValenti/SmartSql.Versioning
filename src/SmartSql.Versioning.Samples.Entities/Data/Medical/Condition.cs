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
    public partial class ConditionController : EntityListMemberController<ConditionInstance, Condition> {

    }

    public partial class ConditionInstance : Instance<Condition> {

    }

    public partial class Condition : EntityRevision<ConditionInstance> {
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<ConditionInstance> Condition { get; set; }
        public DbSet<Condition> ConditionRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class ConditionParameters {
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class ConditionResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Description { get; set; }
    }


    public class ConditionApiController : EntityListMemberApiController<
      ConditionController,
      ConditionInstance, Condition,
      ConditionParameters, ConditionParameters,
      ConditionResponse
      > {

    }
}
