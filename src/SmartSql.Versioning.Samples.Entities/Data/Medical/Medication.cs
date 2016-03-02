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
    public partial class EntityMedicationController : EntityListMemberController<EntityMedicationInstance, EntityMedication> {

    }

    public partial class EntityMedicationInstance : Instance<EntityMedication> {

    }

    public partial class EntityMedication : EntityRevision<EntityMedicationInstance> {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UsageText { get; set; }
    }

    public partial class EntityDataContext : DbContext {

        public DbSet<EntityMedicationInstance> EntityMedicationInstances { get; set; }
        public DbSet<EntityMedication> EntityMedications { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityMedicationParameters {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UsageText { get; set; }
    }

    public class EntityMedicationResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UsageText { get; set; }
    }


    public class EntityMedicationApiController : EntityListMemberApiController<
      EntityMedicationController,
      EntityMedicationInstance, EntityMedication,
      EntityMedicationParameters, EntityMedicationParameters,
      EntityMedicationResponse
      > {

    }
}
