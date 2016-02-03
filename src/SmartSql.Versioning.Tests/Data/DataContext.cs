using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace SmartSql.Versioning.Test {
    public partial class DataContext : DbContext {

        public DataContext() : base("DefaultConnection") {

        }

        static DataContext() {
            Database.SetInitializer<DataContext>(new DropCreateDatabaseAlways<DataContext>());    
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            SmartSql.Versioning.DataContext.RegisterTypes(modelBuilder);
            base.OnModelCreating(modelBuilder);
        }
        
      
    }
}
