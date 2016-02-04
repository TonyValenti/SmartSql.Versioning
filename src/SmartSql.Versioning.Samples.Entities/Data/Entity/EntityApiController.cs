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

    public class EntityParameters {
        public string Name { get; set; }
    }

    public class EntityResponse :  CommonResponse {
        public string Name { get; set; }
    }


    public class EntityApiController :  ApiController<
            DataContext, EntityController,

            EntityInstance, Entity,
            EntityParameters, EntityParameters,
            EntityResponse
        > {

        protected override bool CanUpdate(UpdateRequest<InstanceIdParameters, EntityParameters> Operation) {
            return HasPermission(Operation.Key.InstanceId);
        }

        protected override bool CanGet(GetRequest<InstanceIdParameters> Operation) {
            return HasPermission(Operation.Key.InstanceId);
        }

        protected override bool CanArchive(ArchiveRequest<InstanceIdParameters> Operation) {
            return HasPermission(Operation.Key.InstanceId);
        }

        protected override bool CanRestore(RestoreRequest<InstanceIdParameters> Operation) {
            return HasPermission(Operation.Key.InstanceId);
        }

        protected override bool CanHistory(HistoryRequest<InstanceIdParameters> Operation) {
            return HasPermission(Operation.Key.InstanceId);
        }

        private bool HasPermission(Guid EntityInstanceId) {
            var ret = false;

            if (EntityInstanceId != null) {
                if (DataController.Get(EntityInstanceId) != null) {
                    ret = true;
                }
            }

            return ret;
        }
        protected override IList List(ListRequest<EmptyParameters> Operation) {
            var OwnerUserId = SmartSql.Versioning.Samples.Entities.Framework.Shell.UserId;

            return DataController.All()
                .Where(x => x.OwnerUserId == OwnerUserId)
                .ToList();
        }

        public EntityApiController() {
            var UserId = SmartSql.Versioning.Samples.Entities.Framework.Shell.UserId;
            DataController.Default_Author = new UserAuthor(UserId);
            DataController.Default_OwnerUserId = UserId;
        }
        
    }




   

}
