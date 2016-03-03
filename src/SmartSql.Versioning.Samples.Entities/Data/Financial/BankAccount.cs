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
    public partial class EntityBankAccountController : EntityListMemberController<EntityBankAccountInstance, EntityBankAccount> {

    }

    public partial class EntityBankAccountInstance : Instance<EntityBankAccount> {

    }

    public partial class EntityBankAccount : EntityRevision<EntityBankAccountInstance> {
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityBankAccountInstance> EntityBankAccountInstances { get; set; }
        public DbSet<EntityBankAccount> EntityBankAccounts { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityBankAccountParameters {
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
    }

    public class EntityBankAccountResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public string Description { get; set; }
        public string Institution { get; set; }
    }


    public class EntityBankAccountApiController : EntityListMemberApiController<
      EntityBankAccountController,
      EntityBankAccountInstance, EntityBankAccount,
      EntityBankAccountParameters, EntityBankAccountParameters,
      EntityBankAccountResponse
      > {

    }
}
