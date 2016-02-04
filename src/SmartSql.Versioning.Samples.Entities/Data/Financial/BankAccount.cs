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
    public partial class BankAccountController : EntityListMemberController<BankAccountInstance, BankAccount> {

    }

    public partial class BankAccountInstance : Instance<BankAccount> {

    }

    public partial class BankAccount : EntityRevision<BankAccountInstance> {
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<BankAccountInstance> BankAccount { get; set; }
        public DbSet<BankAccount> BankAccountRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class BankAccountParameters {
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
    }

    public class BankAccountResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
    }


    public class BankAccountApiController : EntityListMemberApiController<
      BankAccountController,
      BankAccountInstance, BankAccount,
      BankAccountParameters, BankAccountParameters,
      BankAccountResponse
      > {

    }
}
