using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Collections;

namespace SmartSql.Versioning {
    //We are assuming that things will be fetched by their InstanceId
    public class ApiController<
        TDbContext,                 TController,
        TInstance,                  TValue,
        
        TAddParameters,
        TUpdateParameters,
        TCommonResponse

        > : ApiController<
           TDbContext,              TController,
           TInstance,               TValue,
           InstanceIdParameters,    EmptyParameters,

           TAddParameters,
           TAddParameters,
           TCommonResponse
        >
        where TDbContext : DbContext, new()
        where TController : DataController<TDbContext, TInstance, TValue>, new()
        where TInstance : Instance<TValue>, new()
        where TValue : Revision<TInstance>, new()
        where TCommonResponse : new()
        
        {

        protected override object Add(AddRequest<EmptyParameters, TAddParameters> Operation) {
            return DataController.Add(Operation.Values);
        }

        protected override object Update(UpdateRequest<InstanceIdParameters, TAddParameters> Operation) {
            return DataController.Update(Operation.Key.InstanceId, Operation.Values);
        }

        protected override object Get(GetRequest<InstanceIdParameters> Operation) {
            return DataController.Get(Operation.Key.InstanceId);
        }

        protected override IList List(ListRequest<EmptyParameters> Operation) {
            return DataController.All().ToList();
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


    }
}