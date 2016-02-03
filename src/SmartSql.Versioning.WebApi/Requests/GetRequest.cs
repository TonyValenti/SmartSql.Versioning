using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartSql.Versioning {

    public class GetRequest {
        public Guid InstanceId { get; set; }
    }

    public class GetResponse {
        public Guid InstanceId { get; set; }
        public Guid RevisionId { get; set; }

        public Guid? AuthorId { get; set; }
        public string AuthorName { get; set; }
        public DateTime RevisionDateUtc { get; set; }
        public DateTime CreatedDateUtc { get; set; }
        public bool IsArchived { get; set; }
        public bool IsCurrent { get; set; }
        public bool IsOriginal { get; set; }

    }

    public class GetResponse<TValue> : GetResponse {
        public TValue Value { get; set; }
    }

}
