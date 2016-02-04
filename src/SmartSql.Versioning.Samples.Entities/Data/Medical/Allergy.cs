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
    public partial class AllergyController : EntityListMemberController<AllergyInstance, Allergy> {

    }

    public partial class AllergyInstance : Instance<Allergy> {

    }

    public partial class Allergy : EntityRevision<AllergyInstance> {
        public string Name { get; set; }
        public string Treatment { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<AllergyInstance> Allergy { get; set; }
        public DbSet<Allergy> AllergyRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class AllergyParameters {
        public string Name { get; set; }
        public string Treatment { get; set; }
    }

    public class AllergyResponse : CommonResponse {
        public string Name { get; set; }
        public string Treatment { get; set; }
    }


    public class AllergyApiController : EntityListMemberApiController<
      AllergyController,
      AllergyInstance, Allergy,
      AllergyParameters, AllergyParameters,
      AllergyResponse
      > {

    }

}
