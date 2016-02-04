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
    public partial class BeltSizeController : EntityValueMemberController<BeltSizeInstance, BeltSize> {

    }

    public partial class BeltSizeInstance : Instance<BeltSize> {

    }

    public partial class BeltSize : EntityRevision<BeltSizeInstance, String> {

    }

    public partial class DataContext : DbContext {
        public DbSet<BeltSizeInstance> BeltSize { get; set; }
        public DbSet<BeltSize> BeltSizeRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class BeltSizeParameters : ValueParameter<String> {

    }

    public class BeltSizeResponse : EntityMemberResponse<String> {

    }

    public class BeltSizeApiController : EntityValueMemberApiController<
      BeltSizeController,
      BeltSizeInstance, BeltSize,
      BeltSizeParameters, BeltSizeParameters,
      BeltSizeResponse
      > {

    }

}