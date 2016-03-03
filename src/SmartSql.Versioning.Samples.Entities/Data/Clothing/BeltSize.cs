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
    public partial class EntityBeltSizeController : EntityValueMemberController<EntityBeltSizeInstance, EntityBeltSize> {

    }

    public partial class EntityBeltSizeInstance : Instance<EntityBeltSize> {

    }

    public partial class EntityBeltSize : EntityRevision<EntityBeltSizeInstance, String> {

    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityBeltSizeInstance> EntityBeltSizeInstances { get; set; }
        public DbSet<EntityBeltSize> EntityBeltSizes { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityBeltSizeParameters : ValueParameter<String> {

    }

    public class EntityBeltSizeResponse : EntityMemberResponse<String> {

    }

    public class EntityBeltSizeApiController : EntityValueMemberApiController<
      EntityBeltSizeController,
      EntityBeltSizeInstance, EntityBeltSize,
      EntityBeltSizeParameters, EntityBeltSizeParameters,
      EntityBeltSizeResponse
      > {

    }

}