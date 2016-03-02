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
    public partial class EntityShoeSizeController : EntityValueMemberController<EntityShoeSizeInstance, EntityShoeSize> {

    }

    public partial class EntityShoeSizeInstance : Instance<EntityShoeSize> {

    }

    public partial class EntityShoeSize : EntityRevision<EntityShoeSizeInstance, String> {
        
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityShoeSizeInstance> EntityShoeSizeInstances { get; set; }
        public DbSet<EntityShoeSize> EntityShoeSizes { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityShoeSizeParameters : ValueParameter<String> {

    }

    public class EntityShoeSizeResponse : EntityMemberResponse<String> {

    }

    public class EntityShoeSizeApiController : EntityValueMemberApiController<
      EntityShoeSizeController,
      EntityShoeSizeInstance, EntityShoeSize,
      EntityShoeSizeParameters, EntityShoeSizeParameters,
      EntityShoeSizeResponse
      > {

    }
}
