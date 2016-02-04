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
    public partial class BriggsMyersController : EntityValueMemberController<BriggsMyersInstance, BriggsMyers> {

    }

    public partial class BriggsMyersInstance : Instance<BriggsMyers> {

    }

    public partial class BriggsMyers : EntityRevision<BriggsMyersInstance> {
        public BriggsMyers1 Value1 { get; set; }
        public BriggsMyers2 Value2 { get; set; }
        public BriggsMyers3 Value3 { get; set; }
        public BriggsMyers4 Value4 { get; set; }
    }

    public enum BriggsMyers1 {
        Extraverted,
        Introverted,
        E = Extraverted,
        I = Introverted,
    }

    public enum BriggsMyers2 {
        Sensing,
        Intuition,
        S = Sensing,
        I = Intuition,
    }

    public enum BriggsMyers3 {
        Thinking,
        Feeling,
        T = Thinking,
        F = Feeling,
    }

    public enum BriggsMyers4 {
        Judging,
        Perceiving,
        J = Judging,
        P = Perceiving,
    }

    public partial class DataContext : DbContext {
        public DbSet<BriggsMyersInstance> BriggsMyers { get; set; }
        public DbSet<BriggsMyers> BriggsMyersRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class BriggsMyersParameters {
        public BriggsMyers1 Value1 { get; set; }
        public BriggsMyers2 Value2 { get; set; }
        public BriggsMyers3 Value3 { get; set; }
        public BriggsMyers4 Value4 { get; set; }
    }

    public class BriggsMyersResponse : CommonResponse {
        public BriggsMyers1 Value1 { get; set; }
        public BriggsMyers2 Value2 { get; set; }
        public BriggsMyers3 Value3 { get; set; }
        public BriggsMyers4 Value4 { get; set; }
    }


    public class BriggsMyersApiController : EntityListMemberApiController<
      BriggsMyersController,
      BriggsMyersInstance, BriggsMyers,
      BriggsMyersParameters, BriggsMyersParameters,
      BriggsMyersResponse
      > {

    }


}