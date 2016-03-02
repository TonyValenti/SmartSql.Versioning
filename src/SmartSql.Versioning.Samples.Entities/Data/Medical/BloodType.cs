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
    public partial class EntityBloodTypeController : EntityValueMemberController<EntityBloodTypeInstance, EntityBloodType> {

    }

    public partial class EntityBloodTypeInstance : Instance<EntityBloodType> {

    }

    public partial class EntityBloodType : EntityRevision<EntityBloodTypeInstance, EntityBloodTypeValue> {
        
    }

    public enum EntityBloodTypeValue {
        Unknown                 =   0000,
        APositive               =   1100,
        ANegative               =   1200,
        BPositive               =   2100,
        BNegative               =   2200,
        ABPositive              =   3100,
        ABNegative              =   3200,
        OPositive               =   4100,
        ONegative               =   4200,
    }

    public partial class EntityDataContext : DbContext  {
        public DbSet<EntityBloodTypeInstance> EntityBloodTypeInstances { get; set; }
        public DbSet<EntityBloodType> EntityBloodTypes { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityBloodTypeParameters : ValueParameter<EntityBloodTypeValue> {

    }

    public class EntityBloodTypeResponse : EntityMemberResponse<EntityBloodTypeValue> {

    }

    public class EntityBloodTypeApiController : EntityValueMemberApiController<
      EntityBloodTypeController,
      EntityBloodTypeInstance, EntityBloodType,
      EntityBloodTypeParameters, EntityBloodTypeParameters,
      EntityBloodTypeResponse
      > {

    }
}
