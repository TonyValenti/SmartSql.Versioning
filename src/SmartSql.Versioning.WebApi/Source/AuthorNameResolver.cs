using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace SmartSql.Versioning {
    public class AuthorNameResolver : ValueResolver<Revision, string> {
        protected override string ResolveCore(Revision source) {

            return "Author Name";
        }
        
    }
}
