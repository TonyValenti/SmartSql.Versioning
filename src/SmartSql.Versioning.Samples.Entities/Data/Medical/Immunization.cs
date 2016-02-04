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
    public partial class ImmunizationController : EntityListMemberController<ImmunizationInstance, Immunization> {

    }

    public partial class ImmunizationInstance : Instance<Immunization> {

    }

    public partial class Immunization : EntityRevision<ImmunizationInstance> {
        public string Name { get; set; }
        public DateTime Date { get; set; }
    }

    public partial class DataContext : DbContext {

        public DbSet<ImmunizationInstance> Immunization { get; set; }
        public DbSet<Immunization> ImmunizationRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class ImmunizationParameters {
        public string Name { get; set; }
        public DateTime Date { get; set; }
    }

    public class ImmunizationResponse : CommonResponse {
        public string Name { get; set; }
        public DateTime Date { get; set; }
    }


    public class ImmunizationApiController : EntityListMemberApiController<
      ImmunizationController,
      ImmunizationInstance, Immunization,
      ImmunizationParameters, ImmunizationParameters,
      ImmunizationResponse
      > {

    }

}
