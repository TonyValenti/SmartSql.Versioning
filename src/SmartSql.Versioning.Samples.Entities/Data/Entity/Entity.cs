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

    public partial class EntityController : DataController<DataContext, EntityInstance, Entity> {
        public Guid? Filter_OwnerUserId { get; set; }
        public Guid? Default_OwnerUserId { get; set; }

        protected override void CustomizeNewValue(Entity NewValue) {
            base.CustomizeNewValue(NewValue);

            if (Default_OwnerUserId.HasValue) {
                NewValue.OwnerUserId = Default_OwnerUserId.Value;
            }

        }

        protected override IQueryable<Entity> AllQuery {
            get {
                var ret = base.AllQuery;

                if (Filter_OwnerUserId != null) {
                    ret = ret.Where(x => x.OwnerUserId == Filter_OwnerUserId);
                }

                return ret;

            }
        }


    }

    public partial class EntityInstance : Instance<Entity> {
        
    }
     
    public partial class Entity : Revision<EntityInstance> {
        [Index]
        public Guid OwnerUserId { get; set; }
        public string Name { get; set; }

    }

    public partial class DataContext : DbContext {
        public DbSet<EntityInstance> Entity { get; set; }
        public DbSet<Entity> EntityRevisions { get; set; }
    }

}
