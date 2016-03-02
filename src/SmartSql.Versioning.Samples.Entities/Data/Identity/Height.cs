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
    public partial class EntityHeightController : EntityValueMemberController<EntityHeightInstance, EntityHeight> {

    }

    public partial class EntityHeightInstance : Instance<EntityHeight> {

    }

    public partial class EntityHeight : EntityRevision<EntityHeightInstance> {
        public EntityHeightUnit Unit { get; set; }
        public float Value { get; set; }
    }

    public enum EntityHeightUnit {
        Inches,
        Centimeters
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityHeightInstance> EntityHeightInstances { get; set; }
        public DbSet<EntityHeight> HeightInstances { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityHeightParameters {
        public EntityHeightUnit Unit { get; set; }
        public float Value { get; set; }
    }

    public class EntityHeightResponse : EntityMemberResponse {
        public EntityHeightUnit Unit { get; set; }
        public float Value { get; set; }
    }


    public class EntityHeightApiController : EntityValueMemberApiController<
      EntityHeightController,
      EntityHeightInstance, EntityHeight,
      EntityHeightParameters, EntityHeightParameters,
      EntityHeightResponse
      > {

    }
}
