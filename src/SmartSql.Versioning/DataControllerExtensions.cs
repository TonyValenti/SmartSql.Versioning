using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartSql.Versioning {
    public static class DataControllerExtensions {
        public static IQueryable<TValue> HasInstanceId<TValue>(this IQueryable<TValue> Source, Guid InstanceId)
            where TValue : Revision {

            Source = Source.Where(x => x.InstanceId == InstanceId);

            return Source;
        }

        public static IQueryable<TValue> WhereIsCurrent<TValue>(this IQueryable<TValue> Source)
            where TValue : Revision {

            return Source.WhereIsCurrent(true);
        }

        public static IQueryable<TValue> WhereIsCurrent<TValue>(this IQueryable<TValue> Source, bool Value)
            where TValue : Revision {

            Source = Source.Where(x => x.IsCurrent == Value);

            return Source;
        }

        public static IQueryable<TValue> WhereIsArchived<TValue>(this IQueryable<TValue> Source)
            where TValue : Revision {

            return Source.WhereIsArchived(true);
        }

        public static IQueryable<TValue> WhereIsArchived<TValue>(this IQueryable<TValue> Source, bool Value)
            where TValue : Revision {

            Source = Source.Where(x => x.IsArchived == Value);

            return Source;
        }

        public static IQueryable<TValue> WhereIsOriginal<TValue>(this IQueryable<TValue> Source)
            where TValue : Revision {

            return Source.WhereIsOriginal(true);
        }

        public static IQueryable<TValue> WhereIsOriginal<TValue>(this IQueryable<TValue> Source, bool Value)
            where TValue : Revision {

            Source = Source.Where(x => x.IsOriginal == Value);

            return Source;
        }

        public static IQueryable<TValue> IncludeHistory<TValue>(this IQueryable<TValue> Source, bool Value)
            where TValue : Revision {

            if (Value == false) {
                Source = Source.Where(x => x.IsCurrent);
            }

            return Source;
        }

        public static IQueryable<TValue> IncludeArchived<TValue>(this IQueryable<TValue> Source, bool Value)
            where TValue : Revision {

            if (Value == false) {
                Source = Source.Where(x => !x.IsArchived);
            }


            return Source;
        }

        public static IOrderedQueryable<TValue> OrderByRevisionDateDescending<TValue>(this IQueryable<TValue> Source)
            where TValue : Revision {

            return Source.OrderByDescending(x => x.RevisionDateUtc);
        }



    }
}
