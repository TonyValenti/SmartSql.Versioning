using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace SmartSql.Versioning {
    public static class Mapper {
        private static IMapper __Instance;
        public static IMapper Instance {
            get {
                return __Instance;
            }
        }

        private static MapperConfiguration Config;
        private static Profile Profile;
        

        private class CustomProfile : Profile {
            protected override void Configure() {
                this.CreateMissingTypeMaps = true;
            }

        }

        static Mapper() {
            Profile = new CustomProfile();

            Config = new MapperConfiguration(c => {
                c.AddProfile(Profile);
            });
            
            __Instance = Config.CreateMapper();

        }

            

        public static IMappingExpression CreateMap(Type sourceType, Type destinationType) {
            return Profile.CreateMap(sourceType, destinationType);
        }

        public static IMappingExpression CreateMap(Type sourceType, Type destinationType, AutoMapper.MemberList memberList) {
            return Profile.CreateMap(sourceType, destinationType, memberList);
        }

        public static IMappingExpression<TSource, TDest> CreateMap<TSource, TDest>() {
            return Profile.CreateMap<TSource, TDest>();
        }

        public static IMappingExpression<TSource, TDest> CreateMap<TSource, TDest>(MemberList memberList) {
            return Profile.CreateMap<TSource, TDest>(memberList);
        }

    }
}
