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
    public partial class EntityCertificationController : EntityListMemberController<EntityCertificationInstance, EntityCertification> {

    }

    public partial class EntityCertificationInstance : Instance<EntityCertification> {

    }

    public partial class EntityCertification : EntityRevision<EntityCertificationInstance> {
        public string Name { get; set; }
        public string Issuer { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityCertificationInstance> EntityCertificationInstance { get; set; }
        public DbSet<EntityCertification> EntityCertifications { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityCertificationParameters {
        public string Name { get; set; }
        public string Issuer { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class EntityCertificationResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Issuer { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }


    public class EntityCertificationApiController : EntityListMemberApiController<
      EntityCertificationController,
      EntityCertificationInstance, EntityCertification,
      EntityCertificationParameters, EntityCertificationParameters,
      EntityCertificationResponse
      > {

    }
}
