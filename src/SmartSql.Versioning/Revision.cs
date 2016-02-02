using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartSql.Versioning {

    public partial class Revision<TForInstance> : Revision {
        [ForeignKey("InstanceId")]
        public virtual TForInstance Instance { get; set; }

    }

    public abstract class Revision {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid RevisionId { get; set; }

        [Index]
        public Guid InstanceId { get; set; }

        [ForeignKey("AuthorId")]
        public Author Author { get; set; }
        [Index]
        public Guid? AuthorId { get; set; }


        public DateTime RevisionDateUtc { get; set; }
        public DateTime CreatedDateUtc { get; set; }

        [Index]
        public bool IsArchived { get; set; }
        [Index]
        public bool IsCurrent { get; set; }
        [Index]
        public bool IsOriginal { get; set; }

        public Revision() {
            RevisionDateUtc = DateTime.UtcNow;
            CreatedDateUtc = RevisionDateUtc;
        }
    }
   

    public partial class Revision<TForInstance, TValue> : Revision<TForInstance> {
        public TValue Value { get; set; }
    }


}