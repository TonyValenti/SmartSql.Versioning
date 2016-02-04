using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartSql.Versioning {
    public class InstanceIdParameters {
        public Guid InstanceId { get; set; }
    }

    public class EmptyParameters {

    }

    public class AddRequest<TParentKey, TValues> {
        public TParentKey Key { get; set; }
        public TValues Values { get; set; }
    }

    public class UpdateRequest<TKey, TValues> {
        public TKey Key { get; set; }
        public TValues Values { get; set; }
    }

    public class GetRequest<TKey> {
        public TKey Key { get; set; }
    }

    public class ListRequest<TParentKey> {
        public TParentKey Key { get; set; }
    }

    public class ArchiveRequest<TKey> {
        public TKey Key { get; set; }
    }

    public class RestoreRequest<TKey> {
        public TKey Key { get; set; }
    }

    public class HistoryRequest<TKey> {
        public TKey Key { get; set; }
    }

    public class CommonResponse {
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

    public class CommonResponse<TValue> : CommonResponse {
        public TValue Value { get; set; }
    }

    public class ValueParameter<TValue> {
        public TValue Value { get; set; }
    }

}
