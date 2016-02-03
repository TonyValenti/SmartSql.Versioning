using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartSql.Versioning {

    public class UpdateRequest {
        public Guid InstanceId { get; set; }
    }

    public class UpdateRequest<TValue> : UpdateRequest {
        public TValue Value { get; set; }
    }

    public class UpdateResponse : GetResponse {

    }

    public class UpdateResponse<T> : GetResponse<T> {

    }

}
