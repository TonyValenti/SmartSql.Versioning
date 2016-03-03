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
    public partial class EntityPantSizeController : EntityValueMemberController<EntityPantSizeInstance, EntityPantSize> {

    }

    public partial class EntityPantSizeInstance : Instance<EntityPantSize> {

    }

    public partial class EntityPantSize : EntityRevision<EntityPantSizeInstance, String> {
        
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityPantSizeInstance> EntityPantSizeInstances { get; set; }
        public DbSet<EntityPantSize> EntityPantSizes { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityPantSizeParameters : ValueParameter<String> {

    }

    public class EntityPantSizeResponse : EntityMemberResponse<String> {

    }

    public class EntityPantSizeApiController : EntityValueMemberApiController<
      EntityPantSizeController,
      EntityPantSizeInstance, EntityPantSize,
      EntityPantSizeParameters, EntityPantSizeParameters,
      EntityPantSizeResponse
      > {

    }
}
