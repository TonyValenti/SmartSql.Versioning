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
    public partial class DressSizeController : EntityValueMemberController<DressSizeInstance, DressSize> {

    }

    public partial class DressSizeInstance : Instance<DressSize> {

    }

    public partial class DressSize : EntityRevision<DressSizeInstance, String> {

    }

    public partial class DataContext : DbContext {
        public DbSet<DressSizeInstance> DressSize { get; set; }
        public DbSet<DressSize> DressSizeRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class DressSizeParameters : ValueParameter<String> {

    }

    public class DressSizeResponse : EntityMemberResponse<String> {

    }

    public class DressSizeApiController : EntityValueMemberApiController<
      DressSizeController,
      DressSizeInstance, DressSize,
      DressSizeParameters, DressSizeParameters,
      DressSizeResponse
      > {

    }
}