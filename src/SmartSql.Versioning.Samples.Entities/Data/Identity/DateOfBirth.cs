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
    public partial class EntityDateOfBirthController : EntityValueMemberController<EntityDateOfBirthInstance, EntityDateOfBirth> {

    }

    public partial class EntityDateOfBirthInstance : Instance<EntityDateOfBirth> {

    }

    public partial class EntityDateOfBirth : EntityRevision<EntityDateOfBirthInstance, DateTime> {
        
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityDateOfBirthInstance> EntityDateOfBirthInstances { get; set; }
        public DbSet<EntityDateOfBirth> EntityDateOfBirths { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityDateOfBirthParameters : ValueParameter<DateTime> {

    }

    public class EntityDateOfBirthResponse : EntityMemberResponse<DateTime> {

    }

    public class EntityDateOfBirthApiController : EntityValueMemberApiController<
      EntityDateOfBirthController,
      EntityDateOfBirthInstance, EntityDateOfBirth,
      EntityDateOfBirthParameters, EntityDateOfBirthParameters,
      EntityDateOfBirthResponse
      > {

    }
}
