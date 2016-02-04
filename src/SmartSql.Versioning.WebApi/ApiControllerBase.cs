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


        protected virtual Object Add(AddRequest<TAddParentKey, TAddValues> Operation) {
            return true;
        }
        protected virtual Object Update(UpdateRequest<TUpdateKey, TUpdateValues> Operation) {
            return true;
        }
        protected virtual Object Get(GetRequest<TGetKey> Operation) {
            return true;
        }
        protected virtual IList List(ListRequest<TListParentKey> Operation) {
            return null;
        }
        protected virtual Object Archive(ArchiveRequest<TArchiveKey> Operation) {
            return true;
        }
        protected virtual Object Restore(RestoreRequest<TRestoreKey> Operation) {
            return true;
        }
        protected virtual IList History(HistoryRequest<THistoryKey> Operation) {
            return null;
        }


        [HttpPost]
        [ActionName("Add")]
        public virtual IHttpActionResult AddWebMethod(AddRequest<TAddParentKey, TAddValues> Operation) {
            IHttpActionResult ret = Unauthorized();

            if (CanAdd(Operation)) {
                var Value = Add(Operation);
                var mapped = Mapper.Instance.Map<TAddResponse>(Value);
                ret = Ok(mapped);
            } 

            return ret;
        }

        [HttpPost]
        [ActionName("Update")]
        public virtual IHttpActionResult UpdateWebMethod(UpdateRequest<TUpdateKey, TUpdateValues> Operation) {
            IHttpActionResult ret = Unauthorized();

            if (CanUpdate(Operation)) {
                var Value = Update(Operation);
                var mapped = Mapper.Instance.Map<TUpdateResponse>(Value);
                ret = Ok(mapped);
            }

            return ret;
        }

        [HttpPost]
        [ActionName("Get")]
        public virtual IHttpActionResult GetWebMethod(GetRequest<TGetKey> Operation) {
            IHttpActionResult ret = Unauthorized();

            if (CanGet(Operation)) {
                var Value = Get(Operation);
                var mapped = Mapper.Instance.Map<TGetResponse>(Value);
                ret = Ok(mapped);
            }

            return ret;
        }

        [HttpPost]
        [ActionName("List")]
        public virtual IHttpActionResult ListWebMethod(ListRequest<TListParentKey> Operation) {
            IHttpActionResult ret = Unauthorized();

            if (CanList(Operation)) {
                var Value = List(Operation);
                var mapped = Mapper.Instance.MapList<TListResponse>(Value);
                ret = Ok(mapped);
            }

            return ret;
        }

        [HttpPost]
        [ActionName("Archive")]
        public virtual IHttpActionResult ArchiveWebMethod(ArchiveRequest<TArchiveKey> Operation) {
            IHttpActionResult ret = Unauthorized();

            if (CanArchive(Operation)) {
                var Value = Archive(Operation);
                var mapped = Mapper.Instance.Map<TArchiveResponse>(Value);
                ret = Ok(mapped);
            }

            return ret;
        }

        [HttpPost]
        [ActionName("Restore")]
        public virtual IHttpActionResult RestoreWebMethod(RestoreRequest<TRestoreKey> Operation) {
            IHttpActionResult ret = Unauthorized();

            if (CanRestore(Operation)) {
                var Value = Restore(Operation);
                var mapped = Mapper.Instance.Map<TRestoreResponse>(Value);
                ret = Ok(mapped);
            }

            return ret;
        }

        [HttpPost]
        [ActionName("History")]
        public virtual IHttpActionResult HistoryWebMethod(HistoryRequest<THistoryKey> Operation) {
            IHttpActionResult ret = Unauthorized();

            if (CanHistory(Operation)) {
                var Value = History(Operation);
                var mapped = Mapper.Instance.MapList<TListResponse>(Value);
                ret = Ok(mapped);
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
