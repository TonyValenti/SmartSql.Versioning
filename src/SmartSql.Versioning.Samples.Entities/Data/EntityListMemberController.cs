using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using SmartSql.Versioning;

namespace SmartSql.Versioning.Samples.Entities.Data {

    

    public class EntityListMemberController<TInstance, TValue> : DataController<EntityDataContext, TInstance, TValue>
        where TInstance : Instance<TValue>, new()
        where TValue : EntityRevision<TInstance>, new() {

        public Guid? Filter_OwnerUserId { get; set; }
        public Guid? Filter_EntityId { get; set; }
        public Guid? Default_EntityId { get; set; }

        protected override void CustomizeNewValue(TValue NewValue) {
            base.CustomizeNewValue(NewValue);

            if (Default_EntityId.HasValue) {
                NewValue.EntityId = Default_EntityId.Value;
            }

        }

        protected override IQueryable<TValue> AllQuery {
            get {
                var ret = base.AllQuery;

                if (Filter_EntityId != null) {
                    ret = ret.Where(x => x.EntityId == Filter_EntityId);
                }

                if(Filter_OwnerUserId != null) {
                    ret = ret.Where(x => x.Entity.Revisions.Where(y => y.IsCurrent).First().OwnerUserId == Filter_OwnerUserId);
                }

                return ret;
            }
        }

    }
}
