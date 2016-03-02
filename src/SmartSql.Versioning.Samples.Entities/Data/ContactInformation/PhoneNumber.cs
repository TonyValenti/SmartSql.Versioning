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
    public partial class EntityPhoneNumberController : EntityListMemberController<EntityPhoneNumberInstance, EntityPhoneNumber> {

    }

    public partial class EntityPhoneNumberInstance : Instance<EntityPhoneNumber> {

    }

    public partial class EntityPhoneNumber : EntityRevision<EntityPhoneNumberInstance> {
        public string Name { get; set; }
        public string Value { get; set; }
        bool IsMobile { get; set; }
        bool EnableNotifications { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityPhoneNumberInstance> EntityPhoneNumberInstances { get; set; }
        public DbSet<EntityPhoneNumber> EntityPhoneNumbers { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityPhoneNumberParameters {
        public string Name { get; set; }
        public string Value { get; set; }
        bool IsMobile { get; set; }
        bool EnableNotifications { get; set; }
    }

    public class EntityPhoneNumberResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Value { get; set; }
        bool IsMobile { get; set; }
        bool EnableNotifications { get; set; }
    }


    public class EntityPhoneNumberApiController : EntityListMemberApiController<
      EntityPhoneNumberController,
      EntityPhoneNumberInstance, EntityPhoneNumber,
      EntityPhoneNumberParameters, EntityPhoneNumberParameters,
      EntityPhoneNumberResponse
      > {

    }
}
