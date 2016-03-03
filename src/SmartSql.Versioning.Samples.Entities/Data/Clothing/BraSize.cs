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
    public partial class EntityBraSizeController : EntityValueMemberController<EntityBraSizeInstance, EntityBraSize>
    {

    }

    public partial class EntityBraSizeInstance : Instance<EntityBraSize>
    {

    }

    public partial class EntityBraSize : EntityRevision<EntityBraSizeInstance, String>
    {

    }

    public partial class EntityDataContext : DbContext
    {
        public DbSet<EntityBraSizeInstance> EntityBraSizeInstances { get; set; }
        public DbSet<EntityBraSize> EntityBraSizes { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityBraSizeParameters : ValueParameter<String>
    {

    }

    public class EntityBraSizeResponse : EntityMemberResponse<String>
    {

    }

    public class EntityBraSizeApiController : EntityValueMemberApiController<
      EntityBraSizeController,
      EntityBraSizeInstance, EntityBraSize,
      EntityBraSizeParameters, EntityBraSizeParameters,
      EntityBraSizeResponse
      >
    {

    }

}