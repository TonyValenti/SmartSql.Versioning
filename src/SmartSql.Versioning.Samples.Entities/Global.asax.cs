using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace SmartSql.Versioning.Samples.Entities {
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            var StartingAssemblies = 0;
            var EndingAssemblies = 0;
            do {
                var CurrentAssemblies = System.AppDomain.CurrentDomain.GetAssemblies();

                StartingAssemblies = CurrentAssemblies.Length;

                foreach (var asm in CurrentAssemblies) {
                    var ReferencedAssemblies = asm.GetReferencedAssemblies();
                    foreach (var reference in ReferencedAssemblies) {
                        System.Reflection.Assembly.Load(reference);
                    }
                }

                EndingAssemblies = System.AppDomain.CurrentDomain.GetAssemblies().Length;

            } while (StartingAssemblies != EndingAssemblies);

            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
