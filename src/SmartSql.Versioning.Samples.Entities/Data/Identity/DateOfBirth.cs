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
    public partial class DateOfBirthController : EntityValueMemberController<DateOfBirthInstance, DateOfBirth> {

    }

    public partial class DateOfBirthInstance : Instance<DateOfBirth> {

    }

    public partial class DateOfBirth : EntityRevision<DateOfBirthInstance, DateTime> {
        
    }

    public partial class DataContext : DbContext {
        public DbSet<DateOfBirthInstance> DateOfBirth { get; set; }
        public DbSet<DateOfBirth> DateOfBirthRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class DateOfBirthParameters : ValueParameter<DateTime> {

    }

    public class DateOfBirthResponse : CommonResponse<DateTime> {

    }

    public class DateOfBirthApiController : EntityValueMemberApiController<
      DateOfBirthController,
      DateOfBirthInstance, DateOfBirth,
      DateOfBirthParameters, DateOfBirthParameters,
      DateOfBirthResponse
      > {

    }
}
