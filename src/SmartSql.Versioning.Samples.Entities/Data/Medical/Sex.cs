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
    public partial class SexController : EntityValueMemberController<SexInstance, Sex> {

    }

    public partial class SexInstance : Instance<Sex> {

    }

    public partial class Sex : EntityRevision<SexInstance, SexValue> {
        
    }

    public enum SexValue {
        Unknown                 =   0000,
        Male                    =   1000,
        Female                  =   2000,
    }

    public partial class DataContext : DbContext  {
        public DbSet<SexInstance> Sex { get; set; }
        public DbSet<Sex> SexRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class SexParameters : ValueParameter<SexValue> {

    }

    public class SexResponse : EntityMemberResponse<SexValue> {

    }

    public class SexApiController : EntityValueMemberApiController<
      SexController,
      SexInstance, Sex,
      SexParameters, SexParameters,
      SexResponse
      > {

    }
}
