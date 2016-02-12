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
    public partial class EducationLevelController : EntityValueMemberController<EducationLevelInstance, EducationLevel> {

    }

    public partial class EducationLevelInstance : Instance<EducationLevel> {

    }

    public partial class EducationLevel : EntityRevision<EducationLevelInstance, EducationLevelValue> {
        
    }

    public enum EducationLevelValue {
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

    public partial class DataContext : DbContext  {
        public DbSet<EducationLevelInstance> EducationLevel { get; set; }
        public DbSet<EducationLevel> EducationLevelRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EducationLevelParameters : ValueParameter<EducationLevelValue> {

    }

    public class EducationLevelResponse : EntityMemberResponse<EducationLevelValue> {

    }

    public class EducationLevelApiController : EntityValueMemberApiController<
      EducationLevelController,
      EducationLevelInstance,   EducationLevel,
      EducationLevelParameters, EducationLevelParameters,
      EducationLevelResponse
      > {

    }
}
