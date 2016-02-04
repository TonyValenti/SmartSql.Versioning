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
    public partial class PantSizeController : EntityValueMemberController<PantSizeInstance, PantSize> {

    }

    public partial class PantSizeInstance : Instance<PantSize> {

    }

    public partial class PantSize : EntityRevision<PantSizeInstance, String> {
        
    }

    public partial class DataContext : DbContext {
        public DbSet<PantSizeInstance> PantSize { get; set; }
        public DbSet<PantSize> PantSizeRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class PantSizeParameters : ValueParameter<String> {

    }

    public class PantSizeResponse : EntityMemberResponse<String> {

    }

    public class PantSizeApiController : EntityValueMemberApiController<
      PantSizeController,
      PantSizeInstance, PantSize,
      PantSizeParameters, PantSizeParameters,
      PantSizeResponse
      > {

    }
}
