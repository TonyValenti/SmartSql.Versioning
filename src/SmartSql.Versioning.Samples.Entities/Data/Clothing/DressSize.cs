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
    public partial class EntityDressSizeController : EntityValueMemberController<EntityDressSizeInstance, EntityDressSize> {

    }

    public partial class EntityDressSizeInstance : Instance<EntityDressSize> {

    }

    public partial class EntityDressSize : EntityRevision<EntityDressSizeInstance, String> {

    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityDressSizeInstance> EntityDressSizeInstances { get; set; }
        public DbSet<EntityDressSize> EntityDressSizes { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityDressSizeParameters : ValueParameter<String> {

    }

    public class EntityDressSizeResponse : EntityMemberResponse<String> {

    }

    public class DressSizeApiController : EntityValueMemberApiController<
      EntityDressSizeController,
      EntityDressSizeInstance, EntityDressSize,
      EntityDressSizeParameters, EntityDressSizeParameters,
      EntityDressSizeResponse
      > {

    }
}