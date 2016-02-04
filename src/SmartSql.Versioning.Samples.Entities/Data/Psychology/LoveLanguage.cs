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
    public partial class LoveLanguageController : EntityValueMemberController<LoveLanguageInstance, LoveLanguage> {

    }

    public partial class LoveLanguageInstance : Instance<LoveLanguage> {

    }

    public partial class LoveLanguage : EntityRevision<LoveLanguageInstance> {
        public bool HasWordsOfAffirmation { get; set; }
        public bool HasActsOfService { get; set; }
        public bool HasReceivingGifts { get; set; }
        public bool HasQualityTime { get; set; }
        public bool HasPhysicalTouch { get; set; }
    }

    public partial class DataContext : DbContext {
        public DbSet<LoveLanguageInstance> LoveLanguage { get; set; }
        public DbSet<LoveLanguage> LoveLanguageRevisions { get; set; }
    }

    //WebApi Access--------------------------------------------
    public class LoveLanguageParameters {
        public bool HasWordsOfAffirmation { get; set; }
        public bool HasActsOfService { get; set; }
        public bool HasReceivingGifts { get; set; }
        public bool HasQualityTime { get; set; }
        public bool HasPhysicalTouch { get; set; }
    }

    public class LoveLanguageResponse : CommonResponse {
        public bool HasWordsOfAffirmation { get; set; }
        public bool HasActsOfService { get; set; }
        public bool HasReceivingGifts { get; set; }
        public bool HasQualityTime { get; set; }
        public bool HasPhysicalTouch { get; set; }
    }


    public class LoveLanguageApiController : EntityListMemberApiController<
      LoveLanguageController,
      LoveLanguageInstance, LoveLanguage,
      LoveLanguageParameters, LoveLanguageParameters,
      LoveLanguageResponse
      > {

    }
}
