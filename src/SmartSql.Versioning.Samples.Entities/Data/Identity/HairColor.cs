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
    public partial class EntityHairColorController : EntityValueMemberController<EntityHairColorInstance, EntityHairColor> {

    }

    public partial class EntityHairColorInstance : Instance<EntityHairColor> {
    }

    public partial class EntityHairColor : EntityRevision<EntityHairColorInstance, String> {
        
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityHairColorInstance> EntityHairColorInstances { get; set; }
        public DbSet<EntityHairColor> EntityHairColors { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityHairColorParameters : ValueParameter<String> {

    }

    public class EntityHairColorResponse : EntityMemberResponse<String> {

    }

    public class EntityHairColorApiController : EntityValueMemberApiController<
      EntityHairColorController,
      EntityHairColorInstance, EntityHairColor,
      EntityHairColorParameters, EntityHairColorParameters,
      EntityHairColorResponse
      > {

    }
}
