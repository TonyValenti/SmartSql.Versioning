using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using SmartSql.Versioning;
using System.Collections;

namespace SmartSql.Versioning.Samples.Entities.Data {


    public class EntityListMemberApiController<
        TController,

        TInstance, TValue,

        TAddParameters,
        TUpdateParameters,
        TCommonResponse
        >
        : ApiController<
            DataContext, TController,

            TInstance, TValue,

            InstanceIdParameters,
            EntityIdParameters,

            TAddParameters,
            TUpdateParameters,
            TCommonResponse
        >
            where TController : EntityListMemberController<TInstance, TValue>, new()
            where TInstance : Instance<TValue>, new()
            where TValue : EntityRevision<TInstance>, new() 
            where TCommonResponse : new()
        {

        protected override bool CanAdd(AddRequest<EntityIdParameters, TAddParameters> Operation) {
            return HasEntityPermission(Operation.Key.EntityId);
        }

        protected override bool CanUpdate(UpdateRequest<InstanceIdParameters, TUpdateParameters> Operation) {
            return HasItemPermission(Operation.Key.InstanceId);
        }

        protected override bool CanGet(GetRequest<InstanceIdParameters> Operation) {
            return HasItemPermission(Operation.Key.InstanceId);
        }

        protected override bool CanArchive(ArchiveRequest<InstanceIdParameters> Operation) {
            return HasItemPermission(Operation.Key.InstanceId);
        }

        protected override bool CanRestore(RestoreRequest<InstanceIdParameters> Operation) {
            return HasItemPermission(Operation.Key.InstanceId);
        }

        protected override bool CanHistory(HistoryRequest<InstanceIdParameters> Operation) {
            return HasItemPermission(Operation.Key.InstanceId);
        }

        private bool HasEntityPermission(Guid EntityId) {
            var ret = false;

            var EntityController = new EntityController();
            EntityController.Filter_OwnerUserId = Framework.Shell.UserId;
            var Item = EntityController.Get(EntityId);

            if (Item != null) {
                ret = true;
            }

            return ret;
        }

        protected override bool CanList(ListRequest<EntityIdParameters> Operation) {
            return HasEntityPermission(Operation.Key.EntityId);
        }

        private bool HasItemPermission(Guid InstanceId) {
            var ret = false;
            var Item = DataController.Get(InstanceId);
            if (Item != null) {
                var EntityId = Item.EntityId;
                ret = HasEntityPermission(EntityId);
            }

            return ret;
        }

        protected override object Add(AddRequest<EntityIdParameters, TAddParameters> Operation) {
            DataController.Default_EntityId = Operation.Key.EntityId;

            return DataController.Add(Operation.Values);
        }

        protected override object Update(UpdateRequest<InstanceIdParameters, TUpdateParameters> Operation) {
            return DataController.Update(Operation.Key.InstanceId, Operation.Values);
        }

        protected override object Get(GetRequest<InstanceIdParameters> Operation) {
            return DataController.Get(Operation.Key.InstanceId);
        }

        protected override IList List(ListRequest<EntityIdParameters> Operation) {
            var EntityId = Operation.Key.EntityId;

            return DataController.All()
                .Where(x => x.EntityId == EntityId)
                .ToList();
        }

        protected override object Archive(ArchiveRequest<InstanceIdParameters> Operation) {
            return DataController.Archive(Operation.Key.InstanceId);
        }

        protected override object Restore(RestoreRequest<InstanceIdParameters> Operation) {
            return DataController.Restore(Operation.Key.InstanceId);
        }

        protected override IList History(HistoryRequest<InstanceIdParameters> Operation) {
            return DataController.History(Operation.Key.InstanceId).ToList();
        }

        public EntityListMemberApiController() {
            var UserId = Framework.Shell.UserId;

            DataController.Default_Author = new GuidUserAuthor(UserId);

        }

    }






}
