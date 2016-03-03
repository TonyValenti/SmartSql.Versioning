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
    public partial class EntitySexController : EntityValueMemberController<EntitySexInstance, EntitySex> {

    }

    public partial class EntitySexInstance : Instance<EntitySex> {

    }

    public partial class EntitySex : EntityRevision<EntitySexInstance, EntitySexValue> {
        
    }

    public enum EntitySexValue {
        Unknown                 =   0000,
        Male                    =   1000,
        Female                  =   2000,
    }

    public partial class EntityDataContext : DbContext  {
        public DbSet<EntitySexInstance> EntitySexInstances { get; set; }
        public DbSet<EntitySex> EntitySexes { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntitySexParameters : ValueParameter<EntitySexValue> {

    }

    public class EntitySexResponse : EntityMemberResponse<EntitySexValue> {

    }

    public class EntitySexApiController : EntityValueMemberApiController<
      EntitySexController,
      EntitySexInstance, EntitySex,
      EntitySexParameters, EntitySexParameters,
      EntitySexResponse
      > {

    }
}
