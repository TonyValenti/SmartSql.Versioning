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

    public class ApiController<
        TDbContext, TController,

        TInstance, TValue,

        TAddRequest, TAddResponse,
        TUpdateRequest, TUpdateResponse,
        TGetRequest, TGetResponse,
        TListRequest, TListResponse,
        TArchiveRequest, TArchiveResponse,
        TRestoreRequest, TRestoreResponse
        > : ApiControllerBase<
            TAddRequest, TAddResponse,
            TUpdateRequest, TUpdateResponse,
            TGetRequest, TGetResponse,
            TListRequest, TListResponse,
            TArchiveRequest, TArchiveResponse,
            TRestoreRequest, TRestoreResponse
            >
        where TDbContext : DbContext, new()
        where TController : DataController<TDbContext, TInstance, TValue>, new()
        where TInstance : Instance<TValue>, new()
        where TValue : Revision<TInstance>, new()

        where TAddRequest : new()
        where TAddResponse : new()

        where TUpdateRequest : new()
        where TUpdateResponse : new()

        where TGetRequest : new()
        where TGetResponse : new()

        where TListRequest : new()
        where TListResponse : new()

        where TArchiveRequest : new()
        where TArchiveResponse : new()

        where TRestoreRequest : new()
        where TRestoreResponse : new() 
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

    }



}
