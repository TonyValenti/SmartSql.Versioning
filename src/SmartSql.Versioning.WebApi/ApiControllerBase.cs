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


    public abstract class ApiControllerBase <
        TAddRequest,        TAddResponse,
        TUpdateRequest,     TUpdateResponse,
        TGetRequest,        TGetResponse,
        TListRequest,       TListResponse,
        TArchiveRequest,    TArchiveResponse,
        TRestoreRequest,    TRestoreResponse
        > : Controller
        
        where TAddResponse : new()
        where TUpdateResponse : new()
        where TGetResponse : new()
        where TListResponse : new()
        where TArchiveResponse : new()
        where TRestoreResponse : new()
        {

        protected virtual bool Add_HasPermission(TAddRequest Operation) {
            return true;
        }
        protected virtual bool Update_HasPermission(TUpdateRequest Operation) {
            return true;
        }
        protected virtual bool Get_HasPermission(TGetRequest Operation) {
            return true;
        }
        protected virtual bool List_HasPermission(TListRequest Operation) {
            return true;
        }
        protected virtual bool Archive_HasPermission(TArchiveRequest Operation) {
            return true;
        }
        protected virtual bool Restore_HasPermission(TRestoreRequest Operation) {
            return true;
        }

        protected virtual Object Add_Execute(TAddRequest Operation) {
            return true;
        }
        protected virtual Object Update_Execute(TUpdateRequest Operation) {
            return true;
        }
        protected virtual Object Get_Execute(TGetRequest Operation) {
            return true;
        }
        protected virtual IList List_Execute(TListRequest Operation) {
            return null;
        }
        protected virtual Object Archive_Execute(TArchiveRequest Operation) {
            return true;
        }
        protected virtual Object Restore_Execute(TRestoreRequest Operation) {
            return true;
        }



        [HttpPost]
        public virtual ActionResult Add(TAddRequest Operation) {
            object ret = null;

            if (Add_HasPermission(Operation)) {
                var Value = Add_Execute(Operation);
                ret = Mapper.Instance.Map<TAddResponse>(Value);
            }

            return Json(ret);
        }

        [HttpPost]
        public virtual ActionResult Update(TUpdateRequest Operation) {
            object ret = null;

            if (Update_HasPermission(Operation)) {
                var Value = Update_Execute(Operation);
                ret = Mapper.Instance.Map<TUpdateResponse>(Value);
            }

            return Json(ret);
        }

        [HttpPost]
        public virtual ActionResult Get(TGetRequest Operation) {
            object ret = null;

            if (Get_HasPermission(Operation)) {
                var Value = Get_Execute(Operation);
                ret = Mapper.Instance.Map<TGetResponse>(Value);
            }

            return Json(ret);
        }

        [HttpPost]
        public virtual ActionResult List(TListRequest Operation) {
            object ret = null;

            if (List_HasPermission(Operation)) {
                var Value = List_Execute(Operation);
                ret = Mapper.Instance.MapList<TListResponse>(Value);
            }

            return Json(ret);
        }

        [HttpPost]
        public virtual ActionResult Archive(TArchiveRequest Operation) {
            object ret = null;

            if (Archive_HasPermission(Operation)) {
                var Value = Archive_Execute(Operation);
                ret = Mapper.Instance.Map<TArchiveResponse>(Value);
            }

            return Json(ret);
        }

        [HttpPost]
        public virtual ActionResult Restore(TRestoreRequest Operation) {
            object ret = null;

            if (Restore_HasPermission(Operation)) {
                var Value = Restore_Execute(Operation);
                ret = Mapper.Instance.Map<TRestoreResponse>(Value);
            }

            return Json(ret);
        }

        protected override JsonResult Json(object data, string contentType, Encoding contentEncoding, JsonRequestBehavior behavior) {
            return new JsonNetResult {
                Data = data,
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                JsonRequestBehavior = behavior
            };
        }

    }




}
