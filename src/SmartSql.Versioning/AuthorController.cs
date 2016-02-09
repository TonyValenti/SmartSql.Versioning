using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.Entity;

namespace SmartSql.Versioning {
    public class AuthorController {

        public DbContext Context { get; private set; }

        public AuthorController(DbContext Context) {
            this.Context = Context;
        }

        public static AuthorController Instance<Context>() where Context : DbContext, new() {
            return new AuthorController(new Context());
        }


        public Author FindCreateAuthor(Author Author) {
            var ret = default(Author);
            if (Author == null) {
                ret = null;

            } else if (Author is GuidUserAuthor) {
                ret = FindCreateAuthorByUserId(((GuidUserAuthor)Author).UserIdGuid);

            } else if (Author is IntUserAuthor) {
                ret = FindCreateAuthorByUserId(((IntUserAuthor)Author).UserIdInt);

            } else if (Author is LongUserAuthor) {
                ret = FindCreateAuthorByUserId(((LongUserAuthor)Author).UserIdLong);

            } else if (Author is EmailAuthor) {
                ret = FindCreateAuthorByEmail(((EmailAuthor)Author).Email);

            } else if (Author is AnonymousAuthor) {
                ret = FindCreateAnonymousAuthor(((AnonymousAuthor)Author).Name);

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

        public GuidUserAuthor FindCreateAuthorByUserId(Guid UserId) {
            var item = (from x in this.Context.Set<GuidUserAuthor>() where x.UserIdGuid == UserId select x).FirstOrDefault();

            if (item == null) {
                item = new GuidUserAuthor() { UserIdGuid = UserId };

                this.Context.Set<GuidUserAuthor>().Add(item);
                Context.SaveChanges();
            }

            return item;
        }

        public LongUserAuthor FindCreateAuthorByUserId(long UserId) {
            var item = (from x in this.Context.Set<LongUserAuthor>() where x.UserIdLong == UserId select x).FirstOrDefault();

            if (item == null) {
                item = new LongUserAuthor() { UserIdLong = UserId };

                this.Context.Set<LongUserAuthor>().Add(item);
                Context.SaveChanges();
            }

            return item;
        }


        public IntUserAuthor FindCreateAuthorByUserId(int UserId) {
            var item = (from x in this.Context.Set<IntUserAuthor>() where x.UserIdInt == UserId select x).FirstOrDefault();

            if (item == null) {
                item = new IntUserAuthor() { UserIdInt = UserId };

                this.Context.Set<IntUserAuthor>().Add(item);
                Context.SaveChanges();
            }

            return item;
        }

        public AnonymousAuthor FindCreateAnonymousAuthor(string Name) {
            var item = (from x in this.Context.Set<AnonymousAuthor>() where x.Name == Name select x).FirstOrDefault();

            if (item == null) {
                item = new AnonymousAuthor() { Name = Name };

                this.Context.Set<AnonymousAuthor>().Add(item);
                Context.SaveChanges();
            }

            return item;
        }

    }
}
