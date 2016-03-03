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
    public partial class EntityEyeColorController : EntityValueMemberController<EntityEyeColorInstance, EntityEyeColor> {

    }

    public partial class EntityEyeColorInstance : Instance<EntityEyeColor> {

    }

    public partial class EntityEyeColor : EntityRevision<EntityEyeColorInstance, String> {
        
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityEyeColorInstance> EntityEyeColorInstances { get; set; }
        public DbSet<EntityEyeColor> EntityEyeColors { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityEyeColorParameters : ValueParameter<String> {

    }

    public class EntityEyeColorResponse : EntityMemberResponse<String> {

    }

    public class EntityEyeColorApiController : EntityValueMemberApiController<
      EntityEyeColorController,
      EntityEyeColorInstance, EntityEyeColor,
      EntityEyeColorParameters, EntityEyeColorParameters,
      EntityEyeColorResponse
      > {

    }
}
