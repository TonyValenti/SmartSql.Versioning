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
    public partial class HairColorController : EntityValueMemberController<HairColorInstance, HairColor> {

    }

    public partial class HairColorInstance : Instance<HairColor> {
    }

    public partial class HairColor : EntityRevision<HairColorInstance, String> {
        
    }

    public partial class DataContext : DbContext {
        public DbSet<HairColorInstance> HairColor { get; set; }
        public DbSet<HairColor> HairColorRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class HairColorParameters : ValueParameter<String> {

    }

    public class HairColorResponse : EntityMemberResponse<String> {

    }

    public class HairColorApiController : EntityValueMemberApiController<
      HairColorController,
      HairColorInstance, HairColor,
      HairColorParameters, HairColorParameters,
      HairColorResponse
      > {

    }
}
