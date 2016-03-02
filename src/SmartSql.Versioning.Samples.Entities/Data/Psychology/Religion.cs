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
    public partial class EntityReligionController : EntityValueMemberController<EntityReligionInstance, EntityReligion> {

    }

    public partial class EntityReligionInstance : Instance<EntityReligion> {

    }

    public partial class EntityReligion : EntityRevision<EntityReligionInstance, String> {
        
    }

    public partial class EntityDataContext : DbContext  {
        public DbSet<EntityReligionInstance> EntityReligionInstances { get; set; }
        public DbSet<EntityReligion> EntityReligions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityReligionParameters : ValueParameter<String> {

    }

    public class EntityReligionResponse : EntityMemberResponse<String> {

    }

    public class EntityReligionApiController : EntityValueMemberApiController<
      EntityReligionController,
      EntityReligionInstance, EntityReligion,
      EntityReligionParameters, EntityReligionParameters,
      EntityReligionResponse
      > {

    }
}
