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
    public partial class BloodTypeController : EntityValueMemberController<BloodTypeInstance, BloodType> {

    }

    public partial class BloodTypeInstance : Instance<BloodType> {

    }

    public partial class BloodType : EntityRevision<BloodTypeInstance, BloodTypeValue> {
        
    }

    public enum BloodTypeValue {
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

    public partial class DataContext : DbContext  {
        public DbSet<BloodTypeInstance> BloodType { get; set; }
        public DbSet<BloodType> BloodTypeRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class BloodTypeParameters : ValueParameter<BloodTypeValue> {

    }

    public class BloodTypeResponse : EntityMemberResponse<BloodTypeValue> {

    }

    public class BloodTypeApiController : EntityValueMemberApiController<
      BloodTypeController,
      BloodTypeInstance, BloodType,
      BloodTypeParameters, BloodTypeParameters,
      BloodTypeResponse
      > {

    }
}
