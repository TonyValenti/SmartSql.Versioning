using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace SmartSql.Versioning.Test {
    public class PersonApi2Controller : SmartSql.Versioning.Test.PersonApiController
    {

        [HttpGet()]
        public IHttpActionResult DoSomething(int id) {
            return Ok("This is OK!");
        }

    }
}
