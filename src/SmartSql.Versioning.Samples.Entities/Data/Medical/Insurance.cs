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
    public partial class EntityInsuranceController : EntityListMemberController<EntityInsuranceInstance, EntityInsurance> {

    }

    public partial class EntityInsuranceInstance : Instance<EntityInsurance> {

    }

    public partial class EntityInsurance : EntityRevision<EntityInsuranceInstance> {
        public string Name { get; set; }
        public string Details { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityInsuranceInstance> EntityInsuranceInstances { get; set; }
        public DbSet<EntityInsurance> EntityInsurances { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityInsuranceParameters {
        public string Name { get; set; }
        public string Details { get; set; }
    }

    public class EntityInsuranceResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Details { get; set; }
    }


    public class EntityInsuranceApiController : EntityListMemberApiController<
      EntityInsuranceController,
      EntityInsuranceInstance, EntityInsurance,
      EntityInsuranceParameters, EntityInsuranceParameters,
      EntityInsuranceResponse
      > {

    }


}
