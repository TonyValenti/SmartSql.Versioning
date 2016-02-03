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

namespace SmartSql.Versioning.WebApi {

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
        > : ApiController<
            TDbContext, TController,

            TInstance, TValue,

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

        where TAddRequest : new()
        where TUpdateRequest : new()
        where TGetRequest : new()
        where TListRequest : new()
        where TArchiveRequest : new()
        where TRestoreRequest : new()

        where TCommonResponse : new()
        {

       

       



    }


    }
