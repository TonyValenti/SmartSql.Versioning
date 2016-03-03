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

    public partial class EntityLikeController : EntityListMemberController<EntityLikeInstance, EntityLike> {

    }

    public partial class EntityLikeInstance : Instance<EntityLike> {

    }

    public partial class EntityLike : EntityRevision<EntityLikeInstance> {
        public EntityLikeStatus Status { get; set; }
        public EntityLikeCategory Category { get; set; }
        public string Value { get; set; }
    }

    public enum EntityLikeStatus {
        Likes = 1,
        Dislikes = 0
    }

    public enum EntityLikeCategory {
        Animal      =   0050,
        Beverage    =   0100,
        Book        =   0200,
        Food        =   0300,
        Game        =   0400,
        Hobby       =   0500,
        Jewelry     =   0550,
        Movie       =   0600,
        Music       =   0700,
        Place       =   0725,
        Plant       =   0750,
        Show        =   0800,
        Sport       =   0900,
        Store       =   1000,
        Vehicle     =   1100,
        
        
        Other       =   9999999,

    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityLikeInstance> EntityLikeInstances { get; set; }
        public DbSet<EntityLike> EntityLikes { get; set; }
    }

}
