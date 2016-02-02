using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using System.Collections;

namespace SmartSql.Versioning {
    public static class MapperExtensions {

        public static List<TDest> MapList<TDest>(this AutoMapper.IMapper Mapper, IEnumerable Source) where TDest : new() {
            var ret = new List<TDest>();

            if (Source != null) {
                foreach (var item in Source) {
                    var NewItem = Mapper.Map<TDest>(item);
                    ret.Add(NewItem);
                }
            }
            return ret;
        }

        public static List<TDest> MapList<TSource, TDest>(this AutoMapper.IMapper Mapper, IEnumerable<TSource> Source) where TDest : new() {
            var ret = new List<TDest>();

            if (Source != null) {
                foreach (var item in Source) {
                    var NewItem = Mapper.Map<TSource, TDest>(item);
                    ret.Add(NewItem);
                }
            }
            return ret;
        }

        public static TDest SmartMap<TDest>(this AutoMapper.IMapper Mapper, object Source, TDest Dest) {
            return (TDest) Mapper.Map(Source, Dest, Source.GetType(), Dest.GetType());
        }
    

    }
}
