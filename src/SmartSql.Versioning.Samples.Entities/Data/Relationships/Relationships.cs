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
    public partial class EntityRelationshipController : EntityListMemberController<EntityRelationshipInstance, EntityRelationship>
    {

    }

    public partial class EntityRelationshipInstance : Instance<EntityRelationship>
    {

    }

    public partial class EntityRelationship : EntityRevision<EntityRelationshipInstance>
    {
        [ForeignKey("RelationshipEntityId")]
        public EntityInstance RelationshipEntity { get; private set; }
        public Guid? RelationshipEntityId { get; set; }
        public string RelationshipType { get; set; }
    }

    public partial class EntityDataContext : DbContext
    {
        public DbSet<EntityRelationshipInstance> EntityRelationshipInstances { get; set; }
        public DbSet<EntityRelationship> EntityRelationships { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityRelationshipParameters
    {
        public Guid? RelationshipEntityId { get; set; }
        public string RelationshipType { get; set; }
    }

    public class EntityRelationshipResponse : EntityMemberResponse
    {
        public Guid? RelationshipEntityId { get; set; }
        public string RelationshipType { get; set; }
    }


    public class EntityRelationshipApiController : EntityListMemberApiController<
      EntityRelationshipController,
      EntityRelationshipInstance, EntityRelationship,
      EntityRelationshipParameters, EntityRelationshipParameters,
      EntityRelationshipResponse
      >
    {

    }
}
