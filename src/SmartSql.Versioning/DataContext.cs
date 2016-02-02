using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace SmartSql.Versioning {
    public static class DataContext {

        //public DbSet<Author> Authors { get; set; }
        //public DbSet<EmailAuthor> EmailAuthors { get; set; }
        //public DbSet<UserAuthor> UserAuthors { get; set; }
        //public DbSet<AnonymousAuthor> NamedAuthors { get; set; }

        
        public static void RegisterTypes(DbModelBuilder modelBuilder) {
            modelBuilder.Entity<Author>();
            modelBuilder.Entity<EmailAuthor>();
            modelBuilder.Entity<UserAuthor>();
            modelBuilder.Entity<AnonymousAuthor>();
        }

    }
}
