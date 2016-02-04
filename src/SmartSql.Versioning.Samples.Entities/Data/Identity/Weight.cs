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
    public partial class WeightController : EntityValueMemberController<WeightInstance, Weight> {

    }

    public partial class WeightInstance : Instance<Weight> {

    }

    public partial class Weight : EntityRevision<WeightInstance> {
        public WeightUnit Unit { get; set; }
        public float Value { get; set; }
    }

    public enum WeightUnit {
        Pounds,
        Kilograms,
    }

    public partial class DataContext : DbContext {
        public DbSet<WeightInstance> Weight { get; set; }
        public DbSet<Weight> WeightRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class WeightParameters {
        public WeightUnit Unit { get; set; }
        public float Value { get; set; }
    }

    public class WeightResponse : CommonResponse {
        public WeightUnit Unit { get; set; }
        public float Value { get; set; }
    }


    public class WeightApiController : EntityListMemberApiController<
      WeightController,
      WeightInstance, Weight,
      WeightParameters, WeightParameters,
      WeightResponse
      > {

    }

}
