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
    public partial class EntityEmailAddressController : EntityListMemberController<EntityEmailAddressInstance, EntityEmailAddress> {

    }

    public partial class EntityEmailAddressInstance : Instance<EntityEmailAddress> {

    }

    public partial class EntityEmailAddress : EntityRevision<EntityEmailAddressInstance> {
        public string Name { get; set; }
        public string Value { get; set; }
        public bool EnableNotifications { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityEmailAddressInstance> EntityEmailAddressInstances { get; set; }
        public DbSet<EntityEmailAddress> EntityEmailAddresses { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityEmailAddressParameters {
        public string Name { get; set; }
        public string Value { get; set; }
        public bool EnableNotifications { get; set; }
    }

    public class EntityEmailAddressResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Value { get; set; }
        public bool EnableNotifications { get; set; }
    }


    public class EntityEmailAddressApiController : EntityListMemberApiController<
      EntityEmailAddressController,
      EntityEmailAddressInstance, EntityEmailAddress,
      EntityEmailAddressParameters, EntityEmailAddressParameters,
      EntityEmailAddressResponse
      > {

    }

}
