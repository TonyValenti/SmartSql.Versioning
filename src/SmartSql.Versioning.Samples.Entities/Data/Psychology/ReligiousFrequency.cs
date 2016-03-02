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
    public partial class EntityReligiousFrequencyController : EntityValueMemberController<EntityReligiousFrequencyInstance, EntityReligiousFrequency> {

    }

    public partial class EntityReligiousFrequencyInstance : Instance<EntityReligiousFrequency> {

    }

    public partial class EntityReligiousFrequency : EntityRevision<EntityReligiousFrequencyInstance, EntityReligiousFrequencyValue> {
        
    }

    public enum EntityReligiousFrequencyValue {
        Never                   =   0,
        SeveralTimesPerYear     =   1000,
        OnceOrTwicePerMonth     =   2000,
        EveryWeek               =   3000
    }

    public partial class EntityDataContext : DbContext  {
        public DbSet<EntityReligiousFrequencyInstance> EntityReligiousFrequencyInstances { get; set; }
        public DbSet<EntityReligiousFrequency> EntityReligiousFrequencies { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityReligiousFrequencyParameters : ValueParameter<EntityReligiousFrequencyValue> {

    }

    public class EntityReligiousFrequencyResponse : EntityMemberResponse<EntityReligiousFrequencyValue> {

    }

    public class EntityReligiousFrequencyApiController : EntityValueMemberApiController<
      EntityReligiousFrequencyController,
      EntityReligiousFrequencyInstance, EntityReligiousFrequency,
      EntityReligiousFrequencyParameters, EntityReligiousFrequencyParameters,
      EntityReligiousFrequencyResponse
      > {

    }
}
