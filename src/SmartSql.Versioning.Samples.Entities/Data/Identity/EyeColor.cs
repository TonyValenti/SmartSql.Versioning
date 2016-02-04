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
    public partial class EyeColorController : EntityValueMemberController<EyeColorInstance, EyeColor> {

    }

    public partial class EyeColorInstance : Instance<EyeColor> {

    }

    public partial class EyeColor : EntityRevision<EyeColorInstance, String> {
        
    }

    public partial class DataContext : DbContext {
        public DbSet<EyeColorInstance> EyeColor { get; set; }
        public DbSet<EyeColor> EyeColorRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EyeColorParameters : ValueParameter<String> {

    }

    public class EyeColorResponse : CommonResponse<String> {

    }

    public class EyeColorApiController : EntityValueMemberApiController<
      EyeColorController,
      EyeColorInstance, EyeColor,
      EyeColorParameters, EyeColorParameters,
      EyeColorResponse
      > {

    }
}
