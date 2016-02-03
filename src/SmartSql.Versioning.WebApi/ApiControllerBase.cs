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
        TAddRequest,        TAddResponse,
        TUpdateRequest,     TUpdateResponse,
        TGetRequest,        TGetResponse,
        TListRequest,       TListResponse,
        TArchiveRequest,    TArchiveResponse,
        TRestoreRequest,    TRestoreResponse
        > : ApiController
        
        where TAddResponse : new()
        where TUpdateResponse : new()
        where TGetResponse : new()
        where TListResponse : new()
        where TArchiveResponse : new()
        where TRestoreResponse : new()
        {

        protected virtual bool CanAdd(TAddRequest Operation) {
            return true;
        }
        protected virtual bool CanUpdate(TUpdateRequest Operation) {
            return true;
        }
        protected virtual bool CanGet(TGetRequest Operation) {
            return true;
        }
        protected virtual bool CanList(TListRequest Operation) {
            return true;
        }
        protected virtual bool CanArchive(TArchiveRequest Operation) {
            return true;
        }
        protected virtual bool CanRestore(TRestoreRequest Operation) {
            return true;
        }

        protected virtual Object Add(TAddRequest Operation) {
            return true;
        }
        protected virtual Object Update(TUpdateRequest Operation) {
            return true;
        }
        protected virtual Object Get(TGetRequest Operation) {
            return true;
        }
        protected virtual IList List(TListRequest Operation) {
            return null;
        }
        protected virtual Object Archive(TArchiveRequest Operation) {
            return true;
        }
        protected virtual Object Restore(TRestoreRequest Operation) {
            return true;
        }



        [HttpPost]
        [ActionName("Add")]
        public virtual IHttpActionResult AddWebMethod([FromBody] TAddRequest Operation) {
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
        public virtual IHttpActionResult UpdateWebMethod(TUpdateRequest Operation) {
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
        public virtual IHttpActionResult GetWebMethod(TGetRequest Operation) {
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
        public virtual IHttpActionResult ListWebMethod(TListRequest Operation) {
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
        public virtual IHttpActionResult ArchiveWebMethod(TArchiveRequest Operation) {
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
        public virtual IHttpActionResult RestoreWebMethod(TRestoreRequest Operation) {
            IHttpActionResult ret = Unauthorized();

            if (CanRestore(Operation)) {
                var Value = Restore(Operation);
                var mapped = Mapper.Instance.Map<TRestoreResponse>(Value);
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
