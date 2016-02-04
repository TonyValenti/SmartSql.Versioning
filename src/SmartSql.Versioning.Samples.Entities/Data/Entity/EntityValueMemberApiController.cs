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


    public class EntityValueMemberApiController<
        TController,

        TInstance, TValue,

        TAddParameters,
        TUpdateParameters,
        TCommonResponse
        >
        : ApiController<
            DataContext, TController,

            TInstance, TValue,

            EntityIdParameters,
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

        protected override bool CanUpdate(UpdateRequest<EntityIdParameters, TUpdateParameters> Operation) {
            return HasEntityPermission(Operation.Key.EntityId);
        }

        protected override bool CanGet(GetRequest<EntityIdParameters> Operation) {
            return HasEntityPermission(Operation.Key.EntityId);
        }

        protected override bool CanList(ListRequest<EntityIdParameters> Operation) {
            return HasEntityPermission(Operation.Key.EntityId);
        }

        protected override bool CanArchive(ArchiveRequest<EntityIdParameters> Operation) {
            return HasEntityPermission(Operation.Key.EntityId);
        }

        protected override bool CanRestore(RestoreRequest<EntityIdParameters> Operation) {
            return HasEntityPermission(Operation.Key.EntityId);
        }

        protected override bool CanHistory(HistoryRequest<EntityIdParameters> Operation) {
            return HasEntityPermission(Operation.Key.EntityId);
        }



        protected override object Add(AddRequest<EntityIdParameters, TAddParameters> Operation) {
            return AddUpdate(Operation.Key.EntityId, Operation.Values);
        }

        protected override object Update(UpdateRequest<EntityIdParameters, TUpdateParameters> Operation) {
            return AddUpdate(Operation.Key.EntityId, Operation.Values);
        }

        private object AddUpdate(Guid EntityId, object Values) {
            object ret = null;

            DataController.Filter_EntityId = EntityId;
            DataController.Default_EntityId = EntityId;

            var Existing = DataController.All()
                .FirstOrDefault();

            if (Existing == null) {
                ret = DataController.Add(Values);
            } else {
                ret = DataController.Update(Existing.InstanceId, Values);
            }

            return ret;
        }

        protected override object Get(GetRequest<EntityIdParameters> Operation) {

            DataController.Filter_EntityId = Operation.Key.EntityId;
            DataController.Default_EntityId = Operation.Key.EntityId;

            var Existing = DataController.All()
                .FirstOrDefault()
                ;

            return Existing;
        }

        protected override IList List(ListRequest<EntityIdParameters> Operation) {
            DataController.Filter_EntityId = Operation.Key.EntityId;
            DataController.Default_EntityId = Operation.Key.EntityId;

            var Existing = DataController.All()
                .Take(1)
                .ToList()
                ;

            return Existing;
        }

        protected override object Archive(ArchiveRequest<EntityIdParameters> Operation) {
            return Archive(Operation.Key.EntityId, true);
        }

        protected override object Restore(RestoreRequest<EntityIdParameters> Operation) {
            return Archive(Operation.Key.EntityId, false);
        }

        private object Archive(Guid EntityId, bool Status) {
            object ret = null;

            DataController.Filter_EntityId = EntityId;
            DataController.Default_EntityId = EntityId;

            var Existing = DataController.All()
                .FirstOrDefault()
                ;

            if (Existing != null) {
                ret = DataController.Archive(Existing.InstanceId, Status);
            }
            return ret;
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

        public EntityValueMemberApiController() {
            var UserId = Framework.Shell.UserId;

            DataController.Default_Author = new UserAuthor(UserId);

        }

    }






}
