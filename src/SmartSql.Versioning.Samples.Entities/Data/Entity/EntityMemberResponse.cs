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

    public class EntityMemberResponse : CommonResponse {
        public Guid EntityId { get; set; }
    }

    public class EntityMemberResponse<TValue> : EntityMemberResponse {
        public TValue Value { get; set; }
    }

}
