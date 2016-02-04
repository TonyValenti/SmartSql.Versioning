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
    public partial class ReligionController : EntityValueMemberController<ReligionInstance, Religion> {

    }

    public partial class ReligionInstance : Instance<Religion> {

    }

    public partial class Religion : EntityRevision<ReligionInstance, String> {
        
    }

    public partial class DataContext : DbContext  {
        public DbSet<ReligionInstance> Religion { get; set; }
        public DbSet<Religion> ReligionRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class ReligionParameters : ValueParameter<String> {

    }

    public class ReligionResponse : CommonResponse<String> {

    }

    public class ReligionApiController : EntityValueMemberApiController<
      ReligionController,
      ReligionInstance, Religion,
      ReligionParameters, ReligionParameters,
      ReligionResponse
      > {

    }
}
