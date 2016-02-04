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
using System.Web.Http.Results;

namespace SmartSql.Versioning {


    public abstract class ApiControllerBase <
        TAddParentKey,      TAddValues,         TAddResponse,
        TUpdateKey,         TUpdateValues,      TUpdateResponse,
        TGetKey,                                TGetResponse,
        TListParentKey,                         TListResponse,
        TArchiveKey,                            TArchiveResponse,
        TRestoreKey,                            TRestoreResponse,
        THistoryKey,                            THistoryResponse
        > : ApiController
        
        where TAddResponse : new()
        where TUpdateResponse : new()
        where TGetResponse : new()
        where TListResponse : new()
        where TArchiveResponse : new()
        where TRestoreResponse : new()
        where THistoryResponse : new()
        {

        protected virtual bool CanAdd(AddRequest<TAddParentKey, TAddValues> Operation) {
            return true;
        }
        protected virtual bool CanUpdate(UpdateRequest<TUpdateKey, TUpdateValues> Operation) {
            return true;
        }
        protected virtual bool CanGet(GetRequest<TGetKey> Operation) {
            return true;
        }
        protected virtual bool CanList(ListRequest<TListParentKey> Operation) {
            return true;
        }
        protected virtual bool CanArchive(ArchiveRequest<TArchiveKey> Operation) {
            return true;
        }
        protected virtual bool CanRestore(RestoreRequest<TRestoreKey> Operation) {
            return true;
        }
        protected virtual bool CanHistory(HistoryRequest<THistoryKey> Operation) {
            return true;
        }


        protected abstract Object Add(AddRequest<TAddParentKey, TAddValues> Operation);

        protected abstract Object Update(UpdateRequest<TUpdateKey, TUpdateValues> Operation);

        protected abstract Object Get(GetRequest<TGetKey> Operation);

        protected abstract IList List(ListRequest<TListParentKey> Operation);

        protected abstract Object Archive(ArchiveRequest<TArchiveKey> Operation);

        protected abstract Object Restore(RestoreRequest<TRestoreKey> Operation);

        protected abstract IList History(HistoryRequest<THistoryKey> Operation);
        

        [HttpPost]
        [ActionName("Add")]
        public virtual TAddResponse AddWebMethod(AddRequest<TAddParentKey, TAddValues> Operation) {
            var ret = default(TAddResponse);

            if (CanAdd(Operation)) {
                var Value = Add(Operation);
                var mapped = Mapper.Instance.Map<TAddResponse>(Value);
                ret = mapped;
            } 

            return ret;
        }

        [HttpPost]
        [ActionName("Update")]
        public virtual TUpdateResponse UpdateWebMethod(UpdateRequest<TUpdateKey, TUpdateValues> Operation) {
            var ret = default(TUpdateResponse);

            if (CanUpdate(Operation)) {
                var Value = Update(Operation);
                var mapped = Mapper.Instance.Map<TUpdateResponse>(Value);
                ret = mapped;
            }

            return ret;
        }

        [HttpPost]
        [ActionName("Get")]
        public virtual TGetResponse GetWebMethod(GetRequest<TGetKey> Operation) {
            var ret = default(TGetResponse);

            if (CanGet(Operation)) {
                var Value = Get(Operation);
                var mapped = Mapper.Instance.Map<TGetResponse>(Value);
                ret = mapped;
            }

            return ret;
        }

        [HttpPost]
        [ActionName("List")]
        public virtual List<TListResponse> ListWebMethod(ListRequest<TListParentKey> Operation) {
            var ret = default(List<TListResponse>);

            if (CanList(Operation)) {
                var Value = List(Operation);
                var mapped = Mapper.Instance.MapList<TListResponse>(Value);
                ret = mapped;
            }

            return ret;
        }

        [HttpPost]
        [ActionName("Archive")]
        public virtual TArchiveResponse ArchiveWebMethod(ArchiveRequest<TArchiveKey> Operation) {
            var ret = default(TArchiveResponse);

            if (CanArchive(Operation)) {
                var Value = Archive(Operation);
                var mapped = Mapper.Instance.Map<TArchiveResponse>(Value);
                ret = mapped;
            }

            return ret;
        }

        [HttpPost]
        [ActionName("Restore")]
        public virtual TRestoreResponse RestoreWebMethod(RestoreRequest<TRestoreKey> Operation) {
            var ret = default(TRestoreResponse);

            if (CanRestore(Operation)) {
                var Value = Restore(Operation);
                var mapped = Mapper.Instance.Map<TRestoreResponse>(Value);
                ret = mapped;
            }

            return ret;
        }

        [HttpPost]
        [ActionName("History")]
        public virtual List<THistoryResponse> HistoryWebMethod(HistoryRequest<THistoryKey> Operation) {
            var ret = default(List<THistoryResponse>);

            if (CanHistory(Operation)) {
                var Value = History(Operation);
                var mapped = Mapper.Instance.MapList<THistoryResponse>(Value);
                ret = mapped;
            }

            return ret;
        }


        protected override JsonResult<T> Json<T>(T content, JsonSerializerSettings serializerSettings, Encoding encoding) {
            serializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            serializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.Objects;

            return new JsonResult<T>(content, serializerSettings, encoding, this);
            
            /*
            return new JsonNetResult<T> { 
                Content = content,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior
            };

            return base.Json<T>(content, serializerSettings, encoding);
            */
        }

     

    }




}
