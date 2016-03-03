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
    public partial class EntityAddressController : EntityListMemberController<EntityAddressInstance, EntityAddress> {

    }

    public partial class EntityAddressInstance : Instance<EntityAddress> {

    }

    public partial class EntityAddress : EntityRevision<EntityAddressInstance> {
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityAddressInstance> EntityAddressInstances { get; set; }
        public DbSet<EntityAddress> EntityAddresses { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityAddressParameters {
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
    }

    public class EntityAddressResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
    }


    public class EntityAddressApiController : EntityListMemberApiController<
      EntityAddressController,
      EntityAddressInstance, EntityAddress,
      EntityAddressParameters, EntityAddressParameters,
      EntityAddressResponse
      > {

    }
}
