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
    public partial class AddressController : EntityListMemberController<AddressInstance, Address> {

    }

    public partial class AddressInstance : Instance<Address> {

    }

    public partial class Address : EntityRevision<AddressInstance> {
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<AddressInstance> Address { get; set; }
        public DbSet<Address> AddressRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class AddressParameters {
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
    }

    public class AddressResponse : EntityMemberResponse {
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
    }


    public class AddressApiController : EntityListMemberApiController<
      AddressController,
      AddressInstance, Address,
      AddressParameters, AddressParameters,
      AddressResponse
      > {

    }
}
