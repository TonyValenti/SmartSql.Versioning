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
    public partial class EntityHeadSizeController : EntityValueMemberController<EntityHeadSizeInstance, EntityHeadSize> {

    }

    public partial class EntityHeadSizeInstance : Instance<EntityHeadSize> {

    }

    public partial class EntityHeadSize : EntityRevision<EntityHeadSizeInstance, String> {
        
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityHeadSizeInstance> EntityHeadSizeInstances { get; set; }
        public DbSet<EntityHeadSize> EntityHeadSizes { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityHeadSizeParameters : ValueParameter<String> {

    }

    public class EntityHeadSizeResponse : EntityMemberResponse<String> {

    }

    public class EntityHeadSizeApiController : EntityValueMemberApiController<
      EntityHeadSizeController,
      EntityHeadSizeInstance, EntityHeadSize,
      EntityHeadSizeParameters, EntityHeadSizeParameters,
      EntityHeadSizeResponse
      > {

    }
}
