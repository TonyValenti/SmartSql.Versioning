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
    public partial class EthnicityController : EntityValueMemberController<EthnicityInstance, Ethnicity> {

    }

    public partial class EthnicityInstance : Instance<Ethnicity> {

    }

    public partial class Ethnicity : EntityRevision<EthnicityInstance, String> {
        
    }

    public partial class DataContext : DbContext {
        public DbSet<EthnicityInstance> Ethnicity { get; set; }
        public DbSet<Ethnicity> EthnicityRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EthnicityParameters : ValueParameter<String> {

    }

    public class EthnicityResponse : EntityMemberResponse<String> {

    }

    public class EthnicityApiController : EntityValueMemberApiController<
      EthnicityController,
      EthnicityInstance, Ethnicity,
      EthnicityParameters, EthnicityParameters,
      EthnicityResponse
      > {

    }
}
