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

    public class EntityLikeParameters {
        public EntityLikeStatus Status { get; set; }
        public EntityLikeCategory Category { get; set; }
        public string Value { get; set; }
    }

    public class EntityLikeResponse : EntityMemberResponse {
        public EntityLikeStatus Status { get; set; }
        public EntityLikeCategory Category { get; set; }
        public string Value { get; set; }
    }


    public class EntityLikeApiController : EntityListMemberApiController<
        EntityLikeController, 
        EntityLikeInstance, EntityLike, 
        EntityLikeParameters, EntityLikeParameters, 
        EntityLikeResponse
        > { 
        
    }






}
