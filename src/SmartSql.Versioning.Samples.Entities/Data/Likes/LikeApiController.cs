using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using SmartSql.Versioning;
using System.Collections;

namespace SmartSql.Versioning.Samples.Entities.Data {

    public class LikeParameters {
        public LikeStatus Status { get; set; }
        public LikeCategory Category { get; set; }
        public string Value { get; set; }
    }

    public class LikeResponse : EntityMemberResponse {
        public LikeStatus Status { get; set; }
        public LikeCategory Category { get; set; }
        public string Value { get; set; }
    }


    public class LikeApiController : EntityListMemberApiController<
        LikeController, 
        LikeInstance, Like, 
        LikeParameters, LikeParameters, 
        LikeResponse
        > { 
        
    }






}
