using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

using System.Linq;
using System.Web.Http;

using Newtonsoft.Json;
using System.Text;

using SmartSql.Versioning;

using System.Data.Entity;

using System.Collections;

namespace SmartSql.Versioning {

    //Take all parameters.
    public class ApiController<
        TDbContext, TController,

        TInstance, TValue,

        TAddParentKey,      TAddValues,         TAddResponse,
        TUpdateKey,         TUpdateValues,      TUpdateResponse,
        TGetKey,                                TGetResponse,
        TListParentKey,                         TListResponse,
        TArchiveKey,                            TArchiveResponse,
        TRestoreKey,                            TRestoreResponse,
        THistoryKey,                            THistoryResponse

        > : ApiControllerBase<
                TAddParentKey,      TAddValues,         TAddResponse,
                TUpdateKey,         TUpdateValues,      TUpdateResponse,
                TGetKey,                                TGetResponse,
                TListParentKey,                         TListResponse,
                TArchiveKey,                            TArchiveResponse,
                TRestoreKey,                            TRestoreResponse,
                THistoryKey,                            THistoryResponse
            >
        where TDbContext : DbContext, new()
        where TController : DataController<TDbContext, TInstance, TValue>, new()
        where TInstance : Instance<TValue>, new()
        where TValue : Revision<TInstance>, new()

        where TAddResponse : new()

        where TUpdateResponse : new()

        where TGetResponse : new()

        where TListResponse : new()

        where TArchiveResponse : new()

        where TRestoreResponse : new()

        where THistoryResponse : new()
        {

        private TController __DataController;
        public TController DataController {
            get {

                if (__DataController == null) {
                    __DataController = new TController();
                }

                return __DataController;
            }
            protected set {
                __DataController = value;
            }
        }


        public ApiController() {
            DataController = new TController();

        }

        protected override object Add(AddRequest<TAddParentKey, TAddValues> Operation) {
            return base.Add(Operation);
        }

        protected override object Update(UpdateRequest<TUpdateKey, TUpdateValues> Operation) {
            return base.Update(Operation);
        }

        protected override object Get(GetRequest<TGetKey> Operation) {
            return base.Get(Operation);
        }

        protected override IList List(ListRequest<TListParentKey> Operation) {
            return base.List(Operation);
        }

        protected override object Archive(ArchiveRequest<TArchiveKey> Operation) {
            return base.Archive(Operation);
        }

        protected override object Restore(RestoreRequest<TRestoreKey> Operation) {
            return base.Restore(Operation);
        }

        protected override IList History(HistoryRequest<THistoryKey> Operation) {
            return base.History(Operation);
        }

        /*
        protected override object Add(TAddRequest Operation) {
            return DataController.Add(Operation);
        }

        protected override object Update(TUpdateRequest Operation) {
            return DataController.Update(Operation);
        }

        protected override object Get(TGetRequest Operation) {
            return DataController.Item(Operation);
        }

        protected override IList List(TListRequest Operation) {
            return DataController.ListAll();
        }

        protected override object Archive(TArchiveRequest Operation) {
            return DataController.Archive(Operation);
        }

        protected override object Restore(TRestoreRequest Operation) {
            return DataController.Restore(Operation);
        }

        protected override IList History(THistoryRequest Operation) {
            return DataController.History(Operation);
        }
        */
    }



}
