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
    public partial class AngerLanguageController : EntityValueMemberController<AngerLanguageInstance, AngerLanguage> {

    }

    public partial class AngerLanguageInstance : Instance<AngerLanguage> {

    }

    public partial class AngerLanguage : EntityRevision<AngerLanguageInstance> {
        public bool HasAvoidant { get; set; }
        public bool HasDirect { get; set; }
        public bool HasPassiveAggressive { get; set; }
        public bool HasReactive { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<AngerLanguageInstance> AngerLanguage { get; set; }
        public DbSet<AngerLanguage> AngerLanguageRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class AngerLanguageParameters {
        public bool HasAvoidant { get; set; }
        public bool HasDirect { get; set; }
        public bool HasPassiveAggressive { get; set; }
        public bool HasReactive { get; set; }
    }

    public class AngerLanguageResponse : EntityMemberResponse {
        public bool HasAvoidant { get; set; }
        public bool HasDirect { get; set; }
        public bool HasPassiveAggressive { get; set; }
        public bool HasReactive { get; set; }
    }


    public class AngerLanguageApiController : EntityValueMemberApiController<
      AngerLanguageController,
      AngerLanguageInstance, AngerLanguage,
      AngerLanguageParameters, AngerLanguageParameters,
      AngerLanguageResponse
      > {

    }
}
