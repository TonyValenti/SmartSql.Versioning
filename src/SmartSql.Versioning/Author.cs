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

    public class UserAuthor : Author {

        [Index]
        public Guid UserId { get; set; }

        public UserAuthor() {

        }

        public UserAuthor(Guid UserId) {
            this.UserId = UserId;
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

