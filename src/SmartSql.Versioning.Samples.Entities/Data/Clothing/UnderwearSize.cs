using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using SmartSql.Versioning;

namespace SmartSql.Versioning.Samples.Entities.Data
{
    //Data Access--------------------------------------------
    public partial class EntityUnderwearSizeController : EntityValueMemberController<EntityUnderwearSizeInstance, EntityUnderwearSize>
    {

    }

    public partial class EntityUnderwearSizeInstance : Instance<EntityUnderwearSize>
    {

    }

    public partial class EntityUnderwearSize : EntityRevision<EntityUnderwearSizeInstance, String>
    {

    }

    public partial class EntityDataContext : DbContext
    {
        public DbSet<EntityUnderwearSizeInstance> EntityUnderwearSizeInstances { get; set; }
        public DbSet<EntityUnderwearSize> EntityUnderwearSizes { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityUnderwearSizeParameters : ValueParameter<String>
    {

    }

    public class EntityUnderwearSizeResponse : EntityMemberResponse<String>
    {

    }

    public class EntityUnderwearSizeApiController : EntityValueMemberApiController<
      EntityUnderwearSizeController,
      EntityUnderwearSizeInstance, EntityUnderwearSize,
      EntityUnderwearSizeParameters, EntityUnderwearSizeParameters,
      EntityUnderwearSizeResponse
      >
    {

    }

}