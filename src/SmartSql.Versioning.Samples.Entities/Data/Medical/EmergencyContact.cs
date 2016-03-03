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
    public partial class EntityEmergencyContactController : EntityListMemberController<EntityEmergencyContactInstance, EntityEmergencyContact> {

    }

    public partial class EntityEmergencyContactInstance : Instance<EntityEmergencyContact> {

    }

    public partial class EntityEmergencyContact : EntityRevision<EntityEmergencyContactInstance> {
        [ForeignKey("EmergencyContactEntityId")]
        public EntityInstance EmergencyContactEntity { get; private set; }
        public Guid? EmergencyContactEntityId { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityEmergencyContactInstance> EntityEmergencyContactInstances { get; set; }
        public DbSet<EntityEmergencyContact> EntityEmergencyContacts { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityEmergencyContactParameters {
        public Guid? EmergencyContactEntityId { get; set; }
    }

    public class EntityEmergencyContactResponse : EntityMemberResponse {
        public Guid? EmergencyContactEntityId { get; set; }
    }


    public class EntityEmergencyContactApiController : EntityListMemberApiController<
      EntityEmergencyContactController,
      EntityEmergencyContactInstance, EntityEmergencyContact,
      EntityEmergencyContactParameters, EntityEmergencyContactParameters,
      EntityEmergencyContactResponse
      > {

    }
}
