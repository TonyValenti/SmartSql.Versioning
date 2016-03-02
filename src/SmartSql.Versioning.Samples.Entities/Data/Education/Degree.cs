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
    public partial class EntityDegreeController : EntityListMemberController<EntityDegreeInstance, EntityDegree>
    {

    }

    public partial class EntityDegreeInstance : Instance<EntityDegree>
    {

    }

    public partial class EntityDegree : EntityRevision<EntityDegreeInstance>
    {
        public string Name { get; set; }
        public string Issuer { get; set; }
        public DateTime? IssueDate { get; set; }
    }

    public partial class EntityDataContext : DbContext
    {
        public DbSet<EntityDegreeInstance> EntityDegreeInstances { get; set; }
        public DbSet<EntityDegree> EntityDegrees { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityDegreeParameters
    {
        public string Name { get; set; }
        public string Issuer { get; set; }
        public DateTime? IssueDate { get; set; }
    }

    public class EntityDegreeResponse : EntityMemberResponse
    {
        public string Name { get; set; }
        public string Issuer { get; set; }
        public DateTime? IssueDate { get; set; }
    }


    public class EntityDegreeApiController : EntityListMemberApiController<
      EntityDegreeController,
      EntityDegreeInstance, EntityDegree,
      EntityDegreeParameters, EntityDegreeParameters,
      EntityDegreeResponse
      >
    {

    }
}
