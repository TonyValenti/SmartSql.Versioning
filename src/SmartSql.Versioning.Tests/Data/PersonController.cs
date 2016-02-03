using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SmartSql.Versioning.Test;
using SmartSql.Versioning;
using System.Web.Http;

namespace SmartSql.Versioning.Test {
    public class PersonApiController : ApiController<SmartSql.Versioning.Test.DataContext, PersonController, PersonInstance, Person> {

        [HttpGet()]
        public IHttpActionResult Original(int id) {
            return Ok("This is OK!");
        }

    }
}
