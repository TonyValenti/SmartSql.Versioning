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
    public partial class MedicationController : EntityListMemberController<MedicationInstance, Medication> {

    }

    public partial class MedicationInstance : Instance<Medication> {

    }

    public partial class Medication : EntityRevision<MedicationInstance> {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UsageText { get; set; }
    }

    public partial class DataContext : DbContext {

        public DbSet<MedicationInstance> Medication { get; set; }
        public DbSet<Medication> MedicationRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class MedicationParameters {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UsageText { get; set; }
    }

    public class MedicationResponse : CommonResponse {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UsageText { get; set; }
    }


    public class MedicationApiController : EntityListMemberApiController<
      MedicationController,
      MedicationInstance, Medication,
      MedicationParameters, MedicationParameters,
      MedicationResponse
      > {

    }
}
