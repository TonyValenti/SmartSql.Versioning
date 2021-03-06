﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartSql.Versioning {
    public class Instance<TRevision> : Instance {
       
        [InverseProperty("Instance")]
        public virtual ICollection<TRevision> Revisions { get; set; }

    }
    
    public class Instance {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid InstanceId { get; set; }
    }
}
