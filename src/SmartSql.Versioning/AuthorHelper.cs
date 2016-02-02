using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;

namespace SmartSql.Versioning {
    public class AuthorHelper {

        public DbContext Context { get; private set; }

        public AuthorHelper(DbContext Context) {
            this.Context = Context;
        }

        public static AuthorHelper Instance<Context>() where Context : DbContext, new() {
            return new AuthorHelper(new Context());
        }


        public Author FindCreateAuthor(Author Author) {
            var ret = default(Author);
            if (Author == null) {
                ret = null;
            } else if (Author is EmailAuthor) {
                ret = FindCreateAuthorByEmail(((EmailAuthor)Author).Email);
            } else if (Author is UserAuthor) {
                ret = FindCreateAuthorByUserId(((UserAuthor)Author).UserId);
            } else {
                throw (new Exception("Unknown Author Type"));
            }

            return ret;
        }

        public Author FindCreateAuthorByEmail(string EMail) {
            var LoweredEmail = EMail.ToLower().Trim();
            var item = (from x in this.Context.Set<EmailAuthor>() where x.Email == LoweredEmail select x).FirstOrDefault();

            if (item == null) {
                item = new EmailAuthor() { Email = LoweredEmail };

                this.Context.Set<EmailAuthor>().Add(item);
                this.Context.SaveChanges();
            }
            return item;
        }

        public UserAuthor FindCreateAuthorByUserId(Guid UserId) {
            var item = (from x in this.Context.Set<UserAuthor>() where x.UserId == UserId select x).FirstOrDefault();

            if (item == null) {
                item = new UserAuthor() { UserId = UserId };

                this.Context.Set<UserAuthor>().Add(item);
                Context.SaveChanges();
            }

            return item;
        }

    }
}
