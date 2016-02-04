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

    public partial class LikeController : EntityListMemberController<LikeInstance, Like> {

    }

    public partial class LikeInstance : Instance<Like> {

    }

    public partial class Like : EntityRevision<LikeInstance> {
        public LikeStatus Status { get; set; }
        public LikeCategory Category { get; set; }
        public string Value { get; set; }
    }

    public enum LikeStatus {
        Likes = 1,
        Dislikes = 0
    }

    public enum LikeCategory {
        Beverage    =   0100,
        Book        =   0200,
        Food        =   0300,
        Game        =   0400,
        Hobby       =   0500,
        Movie       =   0600,
        Music       =   0700,
        Show        =   0800,
        Sport       =   0900,
        Store       =   1000,
        Vehicle     =   1100,
        
        
        Other       =   9999999,

    }

    public partial class DataContext : DbContext {
        public DbSet<LikeInstance> Like { get; set; }
        public DbSet<Like> LikeRevisions { get; set; }
    }

}
