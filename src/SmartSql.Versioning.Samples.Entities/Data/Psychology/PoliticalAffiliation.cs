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
    public partial class PoliticalAffiliationController : EntityValueMemberController<PoliticalAffiliationInstance, PoliticalAffiliation> {

    }

    public partial class PoliticalAffiliationInstance : Instance<PoliticalAffiliation> {

    }

    public partial class PoliticalAffiliation : EntityRevision<PoliticalAffiliationInstance, String> {
        
    }

    public partial class DataContext : DbContext  {
        public DbSet<PoliticalAffiliationInstance> PoliticalAffiliation { get; set; }
        public DbSet<PoliticalAffiliation> PoliticalAffiliationRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class PoliticalAffiliationParameters : ValueParameter<String> {

    }

    public class PoliticalAffiliationResponse : EntityMemberResponse<String> {

    }

    public class PoliticalAffiliationApiController : EntityValueMemberApiController<
      PoliticalAffiliationController,
      PoliticalAffiliationInstance, PoliticalAffiliation,
      PoliticalAffiliationParameters, PoliticalAffiliationParameters,
      PoliticalAffiliationResponse
      > {

    }
}
