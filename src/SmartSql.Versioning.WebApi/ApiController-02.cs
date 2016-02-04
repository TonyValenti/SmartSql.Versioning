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

    //We have a common response with separate add/update parameters.
    public abstract class ApiController<
        TDbContext, TController,

        TInstance, TValue,
        
        TItemKey,
        TParentKey,

        TAddParameters,
        TUpdateParameters,
        TCommonResponse
        > : ApiController<
            TDbContext, TController,

            TInstance, TValue,

            TParentKey,         TAddParameters,         TCommonResponse,
            TItemKey,           TUpdateParameters,      TCommonResponse,
            TItemKey,                                   TCommonResponse,
            TParentKey,                                 TCommonResponse,
            TItemKey,                                   TCommonResponse,
            TItemKey,                                   TCommonResponse,
            TItemKey,                                   TCommonResponse
            >
        where TDbContext : DbContext, new()
        where TController : DataController<TDbContext, TInstance, TValue>, new()
        where TInstance : Instance<TValue>, new()
        where TValue : Revision<TInstance>, new()
        where TCommonResponse : new()

        {

       

       



    }


    }
