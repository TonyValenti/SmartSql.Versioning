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
    public partial class HeadSizeController : EntityValueMemberController<HeadSizeInstance, HeadSize> {

    }

    public partial class HeadSizeInstance : Instance<HeadSize> {

    }

    public partial class HeadSize : EntityRevision<HeadSizeInstance, String> {
        
    }

    public partial class DataContext : DbContext {
        public DbSet<HeadSizeInstance> HeadSize { get; set; }
        public DbSet<HeadSize> HeadSizeRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class HeadSizeParameters : ValueParameter<String> {

    }

    public class HeadSizeResponse : CommonResponse<String> {

    }

    public class HeadSizeApiController : EntityValueMemberApiController<
      HeadSizeController,
      HeadSizeInstance, HeadSize,
      HeadSizeParameters, HeadSizeParameters,
      HeadSizeResponse
      > {

    }
}
