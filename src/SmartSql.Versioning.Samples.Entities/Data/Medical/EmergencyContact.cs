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
    public partial class EmergencyContactController : EntityListMemberController<EmergencyContactInstance, EmergencyContact> {

    }

    public partial class EmergencyContactInstance : Instance<EmergencyContact> {

    }

    public partial class EmergencyContact : EntityRevision<EmergencyContactInstance> {
        [ForeignKey("EmergencyContactEntityId")]
        public EntityInstance EmergencyContactEntity { get; private set; }
        public Guid? EmergencyContactEntityId { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<EmergencyContactInstance> EmergencyContact { get; set; }
        public DbSet<EmergencyContact> EmergencyContactRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EmergencyContactParameters {
        //TODO
    }

    public class EmergencyContactResponse : CommonResponse {
        //TODO
    }


    public class EmergencyContactApiController : EntityListMemberApiController<
      EmergencyContactController,
      EmergencyContactInstance, EmergencyContact,
      EmergencyContactParameters, EmergencyContactParameters,
      EmergencyContactResponse
      > {

    }
}
