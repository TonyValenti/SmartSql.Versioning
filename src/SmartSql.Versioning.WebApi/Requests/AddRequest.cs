using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartSql.Versioning {

    public class AddRequest {

    }

    public class AddRequest<TValue> : AddRequest {
        public TValue Value { get; set; }
    }

    public class AddResponse : GetResponse {

    }

    public class AddResponse<T> : GetResponse<T> {

    }

}
