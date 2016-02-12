using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace SmartSql.Versioning {
    public static class Extensions {
        

        public static IMappingExpression<TSource, TDest> IncludeAuthorName<TSource, TDest>(this IMappingExpression<TSource, TDest> map)
            where TSource : Revision
            where TDest : CommonResponse {

            map.ForMember(x => x.AuthorName, opt => opt.ResolveUsing<AuthorNameResolver>());
            map.ForSourceMember(x => x.Author, opt => opt.Ignore());

            return map;
        }




    }
}
