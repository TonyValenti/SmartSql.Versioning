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
    public partial class EmailController : EntityListMemberController<EmailInstance, Email> {

    }

    public partial class EmailInstance : Instance<Email> {

    }

    public partial class Email : EntityRevision<EmailInstance> {
        public string Name { get; set; }
        public string Value { get; set; }
        public bool EnableNotifications { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<EmailInstance> Email { get; set; }
        public DbSet<Email> EmailRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EmailParameters {
        public string Name { get; set; }
        public string Value { get; set; }
        public bool EnableNotifications { get; set; }
    }

    public class EmailResponse : CommonResponse {
        public string Name { get; set; }
        public string Value { get; set; }
        public bool EnableNotifications { get; set; }
    }


    public class EmailApiController : EntityListMemberApiController<
      EmailController,
      EmailInstance, Email,
      EmailParameters, EmailParameters,
      EmailResponse
      > {

    }

}
