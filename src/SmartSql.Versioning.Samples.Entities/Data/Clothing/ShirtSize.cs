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
    public partial class ShirtSizeController : EntityValueMemberController<ShirtSizeInstance, ShirtSize> {

    }

    public partial class ShirtSizeInstance : Instance<ShirtSize> {

    }

    public partial class ShirtSize : EntityRevision<ShirtSizeInstance, String> {
        
    }

    public partial class DataContext : DbContext {
        public DbSet<ShirtSizeInstance> ShirtSize { get; set; }
        public DbSet<ShirtSize> ShirtSizeRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class ShirtSizeParameters : ValueParameter<String> {

    }

    public class ShirtSizeResponse : CommonResponse<String> {

    }

    public class ShirtSizeApiController : EntityValueMemberApiController<
      ShirtSizeController,
      ShirtSizeInstance, ShirtSize,
      ShirtSizeParameters, ShirtSizeParameters,
      ShirtSizeResponse
      > {

    }
}
