using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SmartSql.Versioning.Test;
using SmartSql.Versioning.WebApi;


namespace SmartSql.Versioning.Test {
    public class PersonApiController : ApiController<SmartSql.Versioning.Test.DataContext, PersonController, PersonInstance, Person> {

    }
}
