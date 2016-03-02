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
    public partial class EntityConditionController : EntityListMemberController<EntityConditionInstance, EntityCondition> {

    }

    public partial class EntityConditionInstance : Instance<EntityCondition> {

    }

    public partial class EntityCondition : EntityRevision<EntityConditionInstance> {
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityConditionInstance> EntityConditionInstances { get; set; }
        public DbSet<EntityCondition> EntityConditions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityConditionParameters {
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class EntityConditionResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Description { get; set; }
    }


    public class EntityConditionApiController : EntityListMemberApiController<
      EntityConditionController,
      EntityConditionInstance, EntityCondition,
      EntityConditionParameters, EntityConditionParameters,
      EntityConditionResponse
      > {

    }
}
