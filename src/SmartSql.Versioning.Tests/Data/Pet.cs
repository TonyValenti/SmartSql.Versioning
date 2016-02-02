using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using SmartSql.Versioning;

namespace SmartSql.Versioning.Tests {

    public partial class PetInstance : Instance<Pet> { }

    public partial class Pet : Revision<PetInstance> {
        [ForeignKey("OwnerInstanceId")]
        public PersonInstance Owner { get; set; }

        [Index]
        public Guid OwnerInstanceId { get; set; }


        public string Name { get; set; }
        public string Animal { get; set; }
    }

    public partial class PetController : DataController<DataContext, PetInstance, Pet> {
        public Guid? Filter_OwnerInstanceId { get; set; }
        public Guid? Default_OwnerInstanceId { get; set; }

        protected override void CustomizeNewValue(Pet NewValue) {
            base.CustomizeNewValue(NewValue);

            if (Default_OwnerInstanceId.HasValue) {
                NewValue.OwnerInstanceId = Default_OwnerInstanceId.Value;
            }

        }

        protected override IQueryable<Pet> AllQuery {
            get {
                var ret = base.AllQuery;

                if (Filter_OwnerInstanceId != null) {
                    ret = ret.Where(x => x.OwnerInstanceId == Filter_OwnerInstanceId);
                }

                return ret;
            }
        }


    }





    public partial class DataContext : DbContext {
        public DbSet<PetInstance> Pet { get; set; }
        public DbSet<Pet> PetRevisions { get; set; }
    }

}
