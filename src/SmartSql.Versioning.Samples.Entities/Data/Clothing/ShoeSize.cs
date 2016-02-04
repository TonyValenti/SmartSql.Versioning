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
    public partial class ShoeSizeController : EntityValueMemberController<ShoeSizeInstance, ShoeSize> {

    }

    public partial class ShoeSizeInstance : Instance<ShoeSize> {

    }

    public partial class ShoeSize : EntityRevision<ShoeSizeInstance, String> {
        
    }

    public partial class DataContext : DbContext {
        public DbSet<ShoeSizeInstance> ShoeSize { get; set; }
        public DbSet<ShoeSize> ShoeSizeRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class ShoeSizeParameters : ValueParameter<String> {

    }

    public class ShoeSizeResponse : CommonResponse<String> {

    }

    public class ShoeSizeApiController : EntityValueMemberApiController<
      ShoeSizeController,
      ShoeSizeInstance, ShoeSize,
      ShoeSizeParameters, ShoeSizeParameters,
      ShoeSizeResponse
      > {

    }
}
