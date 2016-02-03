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

namespace SmartSql.Versioning.WebApi {


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
        public virtual IHttpActionResult AddWebMethod(TAddRequest Operation) {
            object ret = null;

            if (CanAdd(Operation)) {
                var Value = Add(Operation);
                ret = Mapper.Instance.Map<TAddResponse>(Value);
            }

            return Json(ret);
        }

        [HttpPost]
        [ActionName("Update")]
        public virtual IHttpActionResult UpdateWebMethod(TUpdateRequest Operation) {
            object ret = null;

            if (CanUpdate(Operation)) {
                var Value = Update(Operation);
                ret = Mapper.Instance.Map<TUpdateResponse>(Value);
            }

            return Json(ret);
        }

        [HttpPost]
        [ActionName("Get")]
        public virtual IHttpActionResult GetWebMethod(TGetRequest Operation) {
            object ret = null;

            if (CanGet(Operation)) {
                var Value = Get(Operation);
                ret = Mapper.Instance.Map<TGetResponse>(Value);
            }

            return Json(ret);
        }

        [HttpPost]
        [ActionName("List")]
        public virtual IHttpActionResult ListWebMethod(TListRequest Operation) {
            object ret = null;

            if (CanList(Operation)) {
                var Value = List(Operation);
                ret = Mapper.Instance.MapList<TListResponse>(Value);
            }

            return Json(ret);
        }

        [HttpPost]
        [ActionName("Archive")]
        public virtual IHttpActionResult ArchiveWebMethod(TArchiveRequest Operation) {
            object ret = null;

            if (CanArchive(Operation)) {
                var Value = Archive(Operation);
                ret = Mapper.Instance.Map<TArchiveResponse>(Value);
            }

            return Json(ret);
        }

        [HttpPost]
        [ActionName("Restore")]
        public virtual IHttpActionResult RestoreWebMethod(TRestoreRequest Operation) {
            object ret = null;

            if (CanRestore(Operation)) {
                var Value = Restore(Operation);
                ret = Mapper.Instance.Map<TRestoreResponse>(Value);
            }

            return Json(ret);
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
