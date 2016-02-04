using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SmartSql.Versioning;

namespace SmartSql.Versioning.Samples.Entities.Data {

    

    public class EntityValueMemberController<TInstance, TValue> : EntityListMemberController<TInstance, TValue>
        where TInstance : Instance<TValue>, new()
        where TValue : EntityRevision<TInstance>, new() {

        public override TValue Archive(Guid InstanceId, bool Status) {
            return Get();
        }

        public virtual TValue Get() {
            return All().FirstOrDefault();
        }

        protected override TInstance CreateNewInstance() {
            var ret = this.Search(false, true)
                .Select(x => x.Instance)
                .FirstOrDefault()
                ;

            if (ret == null) {
                ret = base.CreateNewInstance();
            }

            return ret;
        }

    }
}
