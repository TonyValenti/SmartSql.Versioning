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
    public partial class CertificationController : EntityListMemberController<CertificationInstance, Certification> {

    }

    public partial class CertificationInstance : Instance<Certification> {

    }

    public partial class Certification : EntityRevision<CertificationInstance> {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<CertificationInstance> Certification { get; set; }
        public DbSet<Certification> CertificationRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class CertificationParameters {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public class CertificationResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Value { get; set; }
    }


    public class CertificationApiController : EntityListMemberApiController<
      CertificationController,
      CertificationInstance, Certification,
      CertificationParameters, CertificationParameters,
      CertificationResponse
      > {

    }
}
