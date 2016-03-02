using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace SmartSql.Versioning.Samples.Entities.Data {
    public partial class EntityDataContext : DbContext {

        public EntityDataContext() : base("DefaultConnection") {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
        
      
    }
}
