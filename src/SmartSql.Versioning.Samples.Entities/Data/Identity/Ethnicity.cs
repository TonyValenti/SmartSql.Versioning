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
    public partial class EntityEthnicityController : EntityValueMemberController<EntityEthnicityInstance, EntityEthnicity> {

    }

    public partial class EntityEthnicityInstance : Instance<EntityEthnicity> {

    }

    public partial class EntityEthnicity : EntityRevision<EntityEthnicityInstance, String> {
        
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityEthnicityInstance> EntityEthnicityInstances { get; set; }
        public DbSet<EntityEthnicity> EntityEthnicities { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityEthnicityParameters : ValueParameter<String> {

    }

    public class EntityEthnicityResponse : EntityMemberResponse<String> {

    }

    public class EntityEthnicityApiController : EntityValueMemberApiController<
      EntityEthnicityController,
      EntityEthnicityInstance, EntityEthnicity,
      EntityEthnicityParameters, EntityEthnicityParameters,
      EntityEthnicityResponse
      > {

    }
}
