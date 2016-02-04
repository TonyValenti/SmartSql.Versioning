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
    public partial class HeightController : EntityValueMemberController<HeightInstance, Height> {

    }

    public partial class HeightInstance : Instance<Height> {

    }

    public partial class Height : EntityRevision<HeightInstance> {
        public HeightUnit Unit { get; set; }
        public float Value { get; set; }
    }

    public enum HeightUnit {
        Inches,
        Centimeters
    }

    public partial class DataContext : DbContext {
        public DbSet<HeightInstance> Height { get; set; }
        public DbSet<Height> HeightRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class HeightParameters {
        public HeightUnit Unit { get; set; }
        public float Value { get; set; }
    }

    public class HeightResponse : EntityMemberResponse {
        public HeightUnit Unit { get; set; }
        public float Value { get; set; }
    }


    public class HeightApiController : EntityValueMemberApiController<
      HeightController,
      HeightInstance, Height,
      HeightParameters, HeightParameters,
      HeightResponse
      > {

    }
}
