using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using SmartSql.Versioning;

namespace SmartSql.Versioning.Samples.Entities.Data {
    public class EntityRevision<T> : Revision<T> {
        [ForeignKey("EntityId")]
        public virtual EntityInstance Entity { get; set; }
        [Index]
        public virtual Guid EntityId { get; set; }
    }

    public class EntityRevision<TForInstance, TValue> : EntityRevision<TForInstance> {
        public TValue Value { get; set; }
    }

    
}
