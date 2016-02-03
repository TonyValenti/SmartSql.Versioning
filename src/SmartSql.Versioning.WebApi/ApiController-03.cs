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

        TInstance, TValue

        > : ApiController<
            TDbContext, TController,

            TInstance, TValue,

            TValue, TValue, //Add
            TValue, TValue, //Update
            GetRequest, TValue, //Get
            ListRequest, TValue, //List
            ArchiveRequest, TValue, //Archive
            TValue, TValue  //Restore
            >
        where TDbContext : DbContext, new()
        where TController : DataController<TDbContext, TInstance, TValue>, new()
        where TInstance : Instance<TValue>, new()
        where TValue : Revision<TInstance>, new()

        {

       

       



    }


    }
