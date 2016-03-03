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
    public partial class EntityWeightController : EntityValueMemberController<EntityWeightInstance, EntityWeight> {

    }

    public partial class EntityWeightInstance : Instance<EntityWeight> {

    }

    public partial class EntityWeight : EntityRevision<EntityWeightInstance> {
        public EntityWeightUnit Unit { get; set; }
        public float Value { get; set; }
    }

    public enum EntityWeightUnit {
        Pounds,
        Kilograms,
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityWeightInstance> EntityWeightInstances { get; set; }
        public DbSet<EntityWeight> EntityWeights { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityWeightParameters {
        public EntityWeightUnit Unit { get; set; }
        public float Value { get; set; }
    }

    public class EntityWeightResponse : EntityMemberResponse {
        public EntityWeightUnit Unit { get; set; }
        public float Value { get; set; }
    }


    public class EntityWeightApiController : EntityValueMemberApiController<
      EntityWeightController,
      EntityWeightInstance, EntityWeight,
      EntityWeightParameters, EntityWeightParameters,
      EntityWeightResponse
      > {

    }

}
