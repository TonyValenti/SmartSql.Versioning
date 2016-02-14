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
    public partial class ReligiousFrequencyController : EntityValueMemberController<ReligiousFrequencyInstance, ReligiousFrequency> {

    }

    public partial class ReligiousFrequencyInstance : Instance<ReligiousFrequency> {

    }

    public partial class ReligiousFrequency : EntityRevision<ReligiousFrequencyInstance, ReligiousFrequencyValue> {
        
    }

    public enum ReligiousFrequencyValue {
        Never                   =   0,
        SeveralTimesPerYear     =   1000,
        OnceOrTwicePerMonth     =   2000,
        EveryWeek               =   3000
    }

    public partial class DataContext : DbContext  {
        public DbSet<ReligiousFrequencyInstance> ReligiousFrequency { get; set; }
        public DbSet<ReligiousFrequency> ReligiousFrequencyRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class ReligiousFrequencyParameters : ValueParameter<ReligiousFrequencyValue> {

    }

    public class ReligiousFrequencyResponse : EntityMemberResponse<ReligiousFrequencyValue> {

    }

    public class ReligiousFrequencyApiController : EntityValueMemberApiController<
      ReligiousFrequencyController,
      ReligiousFrequencyInstance, ReligiousFrequency,
      ReligiousFrequencyParameters, ReligiousFrequencyParameters,
      ReligiousFrequencyResponse
      > {

    }
}
