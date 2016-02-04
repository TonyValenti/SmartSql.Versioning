using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartSql.Versioning.Samples.Entities.Framework { 
    class Shell {
        public static Guid UserId {
            get {
                var ret = new Guid("99999999-9999-9999-9999-999999999999");

                return ret;
            }
        }

    }
}
