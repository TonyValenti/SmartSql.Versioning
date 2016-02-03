using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartSql.Versioning {

    public class ArchiveRequest {
        public Guid InstanceId { get; set; }
    }

    public class ArchiveResponse : GetResponse {

    }

    public class ArchiveResponse<T> : GetResponse<T> {

    }

}
