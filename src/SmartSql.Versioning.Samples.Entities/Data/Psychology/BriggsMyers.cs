using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using SmartSql.Versioning;

namespace SmartSql.Versioning.Samples.Entities.Data {
    //Data Access--------------------------------------------
    public partial class EntityBriggsMyersController : EntityValueMemberController<EntityBriggsMyersInstance, EntityBriggsMyers> {

    }

    public partial class EntityBriggsMyersInstance : Instance<EntityBriggsMyers> {

    }

    public partial class EntityBriggsMyers : EntityRevision<EntityBriggsMyersInstance> {
        public EntityBriggsMyers1 Value1 { get; set; }
        public EntityBriggsMyers2 Value2 { get; set; }
        public EntityBriggsMyers3 Value3 { get; set; }
        public EntityBriggsMyers4 Value4 { get; set; }
    }

    public enum EntityBriggsMyers1 {
        Extraverted,
        Introverted,
        E = Extraverted,
        I = Introverted,
    }

    public enum EntityBriggsMyers2 {
        Sensing,
        Intuition,
        S = Sensing,
        I = Intuition,
    }

    public enum EntityBriggsMyers3 {
        Thinking,
        Feeling,
        T = Thinking,
        F = Feeling,
    }

    public enum EntityBriggsMyers4 {
        Judging,
        Perceiving,
        J = Judging,
        P = Perceiving,
    }

    public partial class EntityDataContext : DbContext {
        public DbSet<EntityBriggsMyersInstance> BriggsMyers { get; set; }
        public DbSet<EntityBriggsMyers> BriggsMyersRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class EntityBriggsMyersParameters {
        public EntityBriggsMyers1 Value1 { get; set; }
        public EntityBriggsMyers2 Value2 { get; set; }
        public EntityBriggsMyers3 Value3 { get; set; }
        public EntityBriggsMyers4 Value4 { get; set; }
    }

    public class EntityBriggsMyersResponse : EntityMemberResponse {
        public EntityBriggsMyers1 Value1 { get; set; }
        public EntityBriggsMyers2 Value2 { get; set; }
        public EntityBriggsMyers3 Value3 { get; set; }
        public EntityBriggsMyers4 Value4 { get; set; }
    }


    public class EntityBriggsMyersApiController : EntityValueMemberApiController<
      EntityBriggsMyersController,
      EntityBriggsMyersInstance, EntityBriggsMyers,
      EntityBriggsMyersParameters, EntityBriggsMyersParameters,
      EntityBriggsMyersResponse
      > {

    }


}