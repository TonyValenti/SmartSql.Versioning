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
    public partial class EntityAllergyController : EntityListMemberController<EntityAllergyInstance, EntityAllergy> {

    }

    public partial class EntityAllergyInstance : Instance<EntityAllergy> {

    }

    public partial class EntityAllergy : EntityRevision<EntityAllergyInstance> {
        public string Name { get; set; }
        public string Treatment { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityAllergyInstance> EntityAllergyInstances { get; set; }
        public DbSet<EntityAllergy> EntityAllergies { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityAllergyParameters {
        public string Name { get; set; }
        public string Treatment { get; set; }
    }

    public class EntityAllergyResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Treatment { get; set; }
    }


    public class EntityAllergyApiController : EntityListMemberApiController<
      EntityAllergyController,
      EntityAllergyInstance, EntityAllergy,
      EntityAllergyParameters, EntityAllergyParameters,
      EntityAllergyResponse
      > {

    }

}
