using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;

using System.Linq;
using System.Web.Mvc;

using Newtonsoft.Json;
using System.Text;

using SmartSql.Versioning;

using System.Data.Entity;

using System.Collections;

namespace SmartSql.Versioning.WebApi {


    public class ApiController<
        TDbContext,             TController, 
        
        TInstance,              TValue, 
        
        TAddRequest,            TAddResponse,
        TUpdateRequest,         TUpdateResponse,
        TGetRequest,            TGetResponse,
        TListRequest,           TListResponse,
        TArchiveRequest,        TArchiveResponse,
        TRestoreRequest,        TRestoreResponse
        > : ApiControllerBase<
            TAddRequest,        TAddResponse, 
            TUpdateRequest,     TUpdateResponse, 
            TGetRequest,        TGetResponse, 
            TListRequest,       TListResponse,
            TArchiveRequest,    TArchiveResponse,
            TRestoreRequest,    TRestoreResponse
            >
        where TDbContext    : DbContext, new()
        where TController   : DataController<TDbContext, TInstance, TValue>, new()
        where TInstance     : Instance<TValue>, new()
        where TValue        : Revision<TInstance>, new()

        where TAddRequest       : AddRequest, new()
        where TUpdateRequest    : UpdateRequest, new()
        where TGetRequest       : GetRequest, new()
        where TListRequest      : ListRequest, new()
        where TArchiveRequest   : ArchiveRequest, new()
        where TRestoreRequest   : RestoreRequest, new()

        where TAddResponse : new()
        where TUpdateResponse : new()
        where TGetResponse : new()
        where TListResponse : new()
        where TArchiveResponse : new()
        where TRestoreResponse : new()
        {


        protected TController DataController;

        public ApiController() {
            DataController = new TController();

        }

        protected override object Add_Execute(TAddRequest Operation) {
            var Value = Mapper.Instance.Map<TValue>(Operation);
            return DataController.Add(Value);
        }

        protected override object Update_Execute(TUpdateRequest Operation) {
            var Value = Mapper.Instance.Map<TValue>(Operation);
            return DataController.Update(Value);
        }


    }

    public class ApiController<
        TDbContext, TController,

        TInstance, TValue,
        
        TAddRequest,
        TUpdateRequest, 
        TGetRequest,
        TListRequest,
        TArchiveRequest, 
        TRestoreRequest,
        TCommonResponse
        > : ApiControllerBase<
            TAddRequest, TCommonResponse,
            TUpdateRequest, TCommonResponse,
            TGetRequest, TCommonResponse,
            TListRequest, TCommonResponse,
            TArchiveRequest, TCommonResponse,
            TRestoreRequest, TCommonResponse
            >
        where TDbContext : DbContext, new()
        where TController : DataController<TDbContext, TInstance, TValue>, new()
        where TInstance : Instance<TValue>, new()
        where TValue : Revision<TInstance>, new()

        where TCommonResponse : new()
        {

        private TController __DataController;
        public TController DataController {
            get {

                if(__DataController == null) {
                    __DataController = new TController();
                }

                return __DataController;
            }
            protected set {
                __DataController = value;
            }
        }

        protected override object Add_Execute(TAddRequest Operation) {
            return DataController.Add(Operation);
        }

        protected override object Update_Execute(TUpdateRequest Operation) {
            return DataController.Update(Operation);
        }

        protected override object Get_Execute(TGetRequest Operation) {
            return DataController.Item(Operation);
        }

        protected override IList List_Execute(TListRequest Operation) {
            return DataController.List();
        }

        protected override object Archive_Execute(TArchiveRequest Operation) {
            return DataController.Archive(Operation);
        }

        protected override object Restore_Execute(TRestoreRequest Operation) {
            return DataController.Restore(Operation);
        }



    }


    }
