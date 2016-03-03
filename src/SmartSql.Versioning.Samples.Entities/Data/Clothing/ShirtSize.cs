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
    public partial class EntityShirtSizeController : EntityValueMemberController<EntityShirtSizeInstance, EntityShirtSize> {

    }

    public partial class EntityShirtSizeInstance : Instance<EntityShirtSize> {

    }

    public partial class EntityShirtSize : EntityRevision<EntityShirtSizeInstance, String> {
        
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityShirtSizeInstance> EntityShirtSizeInstances { get; set; }
        public DbSet<EntityShirtSize> EntityShirtSizes { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityShirtSizeParameters : ValueParameter<String> {

    }

    public class EntityShirtSizeResponse : EntityMemberResponse<String> {

    }

    public class EntityShirtSizeApiController : EntityValueMemberApiController<
      EntityShirtSizeController,
      EntityShirtSizeInstance, EntityShirtSize,
      EntityShirtSizeParameters, EntityShirtSizeParameters,
      EntityShirtSizeResponse
      > {

    }
}
