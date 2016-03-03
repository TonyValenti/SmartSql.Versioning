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
    public partial class EntityEducationLevelController : EntityValueMemberController<EntityEducationLevelInstance, EntityEducationLevel> {

    }

    public partial class EntityEducationLevelInstance : Instance<EntityEducationLevel> {

    }

    public partial class EntityEducationLevel : EntityRevision<EntityEducationLevelInstance, EntityEducationLevelValue> {
        
    }

    public enum EntityEducationLevelValue {
        None                    =   0,
        HighSchool              =   1000,
        TechnicalSchool         =   2000,
        SomeCollege             =   3000,
        AssociatesDegree        =   4000,
        BatchelorsDegree        =   5000,
        GraduateStudent         =   6000,
        MastersDegree           =   7000,
        DoctoralDegree          =   8000,
    }

    public partial class EntityDataContext : DbContext  {
        public DbSet<EntityEducationLevelInstance> EntityEducationLevelInstances { get; set; }
        public DbSet<EntityEducationLevel> EntityEducationLevels { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityEducationLevelParameters : ValueParameter<EntityEducationLevelValue> {

    }

    public class EntityEducationLevelResponse : EntityMemberResponse<EntityEducationLevelValue> {

    }

    public class EntityEducationLevelApiController : EntityValueMemberApiController<
      EntityEducationLevelController,
      EntityEducationLevelInstance,   EntityEducationLevel,
      EntityEducationLevelParameters, EntityEducationLevelParameters,
      EntityEducationLevelResponse
      > {

    }
}
