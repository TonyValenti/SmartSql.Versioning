using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Newtonsoft.Json;
using System.Web.Http;
using System.Web.Http.Results;
using System.Net.Http;
using System.Threading;

namespace SmartSql.Versioning.WebApi {

    public class JsonNetResult<T> : JsonResult<T> {
        public JsonNetResult(T content, JsonSerializerSettings serializerSettings, Encoding encoding, ApiController controller) : base(content, serializerSettings, encoding, controller) {
            SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            serializerSettings.PreserveReferencesHandling = PreserveReferencesHandling.Objects;

            
        }
        public override Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken) {
            var response = new HttpResponseMessage();

            
            response.ContentType = string.IsNullOrEmpty(this.ContentType) ? "application/json" : this.ContentType;

            if (this.ContentEncoding != null)
                response.ContentEncoding = this.ContentEncoding;
            if (this.Data == null)
                return;

            var scriptSerializer = JsonSerializer.Create(this.Settings);

            using (var sw = new System.IO.StringWriter()) {
                scriptSerializer.Serialize(sw, this.Data);
                response.Write(sw.ToString());
            }
        }



        public override void aExecuteResult(ControllerContext context) {

          
        }
    }
}
