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
    public partial class InsuranceController : EntityListMemberController<InsuranceInstance, Insurance> {

    }

    public partial class InsuranceInstance : Instance<Insurance> {

    }

    public partial class Insurance : EntityRevision<InsuranceInstance> {
        public string Name { get; set; }
        public string Details { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<InsuranceInstance> Insurance { get; set; }
        public DbSet<Insurance> InsuranceRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class InsuranceParameters {
        public string Name { get; set; }
        public string Details { get; set; }
    }

    public class InsuranceResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Details { get; set; }
    }


    public class InsuranceApiController : EntityListMemberApiController<
      InsuranceController,
      InsuranceInstance, Insurance,
      InsuranceParameters, InsuranceParameters,
      InsuranceResponse
      > {

    }


}
