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
    public partial class PhoneNumberController : EntityListMemberController<PhoneNumberInstance, PhoneNumber> {

    }

    public partial class PhoneNumberInstance : Instance<PhoneNumber> {

    }

    public partial class PhoneNumber : EntityRevision<PhoneNumberInstance> {
        public string Name { get; set; }
        public string Value { get; set; }
        bool IsMobile { get; set; }
        bool EnableNotifications { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<PhoneNumberInstance> PhoneNumber { get; set; }
        public DbSet<PhoneNumber> PhoneNumberRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class PhoneNumberParameters {
        public string Name { get; set; }
        public string Value { get; set; }
        bool IsMobile { get; set; }
        bool EnableNotifications { get; set; }
    }

    public class PhoneNumberResponse : CommonResponse {
        public string Name { get; set; }
        public string Value { get; set; }
        bool IsMobile { get; set; }
        bool EnableNotifications { get; set; }
    }


    public class PhoneNumberApiController : EntityListMemberApiController<
      PhoneNumberController,
      PhoneNumberInstance, PhoneNumber,
      PhoneNumberParameters, PhoneNumberParameters,
      PhoneNumberResponse
      > {

    }
}
