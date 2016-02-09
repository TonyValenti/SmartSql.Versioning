using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartSql.Versioning {

    public class Author {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid AuthorId { get; set; }


        public static EmailAuthor Create(string EMailAddress) {
            return new EmailAuthor(EMailAddress);
        }

        public static IntUserAuthor Create(int UserId) {
            return new IntUserAuthor(UserId);
        }

        public static LongUserAuthor Create(long UserId) {
            return new LongUserAuthor(UserId);
        }

        public static GuidUserAuthor Create(Guid UserId) {
            return new GuidUserAuthor(UserId);
        }

        public static AnonymousAuthor CreateAnonymous(string Name) {
            return new AnonymousAuthor(Name);
        }

    }

    public class EmailAuthor : Author {

        [Index]
        [StringLength(100)]
        public string Email { get; set; }

        public EmailAuthor() {

        }

        public EmailAuthor(string Email) {
            this.Email = Email;
        }
    }

    public class IntUserAuthor : Author {
        [Index]
        public int UserIdInt { get; set; }

        public IntUserAuthor() {

        }

        public IntUserAuthor(int UserId) {
            this.UserIdInt = UserId;
        }
    }

    public class LongUserAuthor : Author {
        [Index]
        public long UserIdLong { get; set; }

        public LongUserAuthor() {

        }

        public LongUserAuthor(long UserId) {
            this.UserIdLong = UserId;
        }
    }

    public class GuidUserAuthor : Author {

        [Index]
        public Guid UserIdGuid { get; set; }

        public GuidUserAuthor() {

        }

        public GuidUserAuthor(Guid UserId) {
            this.UserIdGuid = UserId;
        }

    }

    public class AnonymousAuthor : Author {

        [Index]
        [StringLength(100)]
        public string Name { get; set; }

        public AnonymousAuthor() {

        }

        public AnonymousAuthor(string Name) {
            this.Name = Name;
        }

    }
}

