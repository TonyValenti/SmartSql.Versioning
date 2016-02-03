using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using SmartSql.Versioning;

namespace SmartSql.Versioning.Test {

    public partial class PersonInstance : Instance<Person> { }

    public partial class Person : Revision<PersonInstance> {
            [Index]
            public Guid OwnerUserId { get; set; }
            public string Name { get; set; }
            public DateTime DateOfBirth { get; set; }
        }

    public partial class PersonController : DataController<DataContext, PersonInstance, Person> {
        public Guid? Filter_OwnerUserId { get; set; }
        public Guid? Default_OwnerUserId { get; set; }

        protected override void CustomizeNewValue(Person NewValue) {
            base.CustomizeNewValue(NewValue);

            if (Default_OwnerUserId.HasValue) {
                NewValue.OwnerUserId = Default_OwnerUserId.Value;
            }

        }

        protected override IQueryable<Person> AllQuery {
            get {
                var ret = base.AllQuery;

                if (Filter_OwnerUserId != null) {
                    ret = ret.Where(x => x.OwnerUserId == Filter_OwnerUserId);
                }

                return ret;
            }
        }
        
    }
    

    public partial class DataContext : DbContext {
        public DbSet<PersonInstance> Person { get; set; }
        public DbSet<Person> PersonRevisions { get; set; }
    }

}
