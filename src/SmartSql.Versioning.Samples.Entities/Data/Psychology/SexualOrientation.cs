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
    public partial class EntitySexualOrientationController : EntityValueMemberController<EntitySexualOrientationInstance, EntitySexualOrientation>
    {

    }

    public partial class EntitySexualOrientationInstance : Instance<EntitySexualOrientation>
    {

    }

    public partial class EntitySexualOrientation : EntityRevision<EntitySexualOrientationInstance, String>
    {

    }

    public partial class EntityDataContext : DbContext
    {
        public DbSet<EntitySexualOrientationInstance> EntitySexualOrientationInstances { get; set; }
        public DbSet<EntitySexualOrientation> EntitySexualOrientations { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntitySexualOrientationParameters : ValueParameter<String>
    {

    }

    public class EntitySexualOrientationResponse : EntityMemberResponse<String>
    {

    }

    public class EntitySexualOrientationApiController : EntityValueMemberApiController<
      EntitySexualOrientationController,
      EntitySexualOrientationInstance, EntitySexualOrientation,
      EntitySexualOrientationParameters, EntitySexualOrientationParameters,
      EntitySexualOrientationResponse
      >
    {

    }
}
