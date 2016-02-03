using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartSql.Versioning.WebApi {

    public class RestoreRequest {
        public Guid InstanceId { get; set; }
    }

    public class RestoreResponse : GetResponse {

    }

    public class RestoreResponse<T> : GetResponse<T> {

    }
}
