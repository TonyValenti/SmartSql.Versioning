using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using SmartSql.Versioning;

namespace SmartSql.Versioning.Samples.Entities.Data
{
    //Data Access--------------------------------------------
    public partial class EntitySchoolController : EntityListMemberController<EntitySchoolInstance, EntitySchool>
    {

    }

    public partial class EntitySchoolInstance : Instance<EntitySchool>
    {

    }

    public partial class EntitySchool : EntityRevision<EntitySchoolInstance>
    {
        public string SchoolName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

    }

    public partial class EntityDataContext : DbContext
    {
        public DbSet<EntitySchoolInstance> EntitySchoolInstances { get; set; }
        public DbSet<EntitySchool> EntitySchools { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntitySchoolParameters
    {
        public string SchoolName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }

    public class EntitySchoolResponse : EntityMemberResponse
    {
        public string SchoolName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }


    public class EntitySchoolApiController : EntityListMemberApiController<
      EntitySchoolController,
      EntitySchoolInstance, EntitySchool,
      EntitySchoolParameters, EntitySchoolParameters,
      EntitySchoolResponse
      >
    {

    }
}
