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
    public abstract class ApiController<
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



    }


}
