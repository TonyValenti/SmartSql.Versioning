using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using SmartSql.Versioning;

namespace SmartSql.Versioning.Tests {
    [TestClass]
    public class UnitTest1 {
        [TestMethod]
        public void PersonController_Add() {
            //This should add a person to the database and make sure that they got added.
            var Name_Original = "Added Person";

            var PersonController = new PersonController();

            var ItemsAtStart = PersonController.List().Count;

            var Person = PersonController.Add(new Person() {
                Name = Name_Original,
                DateOfBirth = DateTime.Now,
            });

            var ItemsAtEnd = PersonController.List().Count;

            Person = PersonController.Item(Person.InstanceId);

            //The items in our list should have increased by 1.
            Assert.AreEqual(ItemsAtStart + 1, ItemsAtEnd);
            Assert.AreEqual(Name_Original, Person.Name);
        }

        [TestMethod]
        public void PersonController_Add_Update() {
            var Name_Original = "Added Person";
            var Name_Updated = "Updated Person";

            var PersonController = new PersonController();

            var ItemsAtStart = PersonController.List().Count;

            var Person = PersonController.Add(new Person() {
                Name = Name_Original,
                DateOfBirth = DateTime.Now
            });

            Person.Name = Name_Updated;
            PersonController.Update(Person);

            Person = PersonController.Item(Person.InstanceId);

            var ItemsAtEnd = PersonController.List().Count;

            //Make sure our count increased by 1.
            Assert.AreEqual(ItemsAtStart + 1, ItemsAtEnd);
            //Make sure that we have the updated name.
            Assert.AreEqual(Name_Updated, Person.Name);
        }


        [TestMethod]
        public void PersonController_Add_Update_Archive() {
            var Name_Original = "Added Person";
            var Name_Updated = "Updated Person";

            var PersonController = new PersonController();

            var ItemsAtStart = PersonController.List().Count;

            var Person = PersonController.Add(new Person() {
                Name = Name_Original,
                DateOfBirth = DateTime.Now
            });

            Person.Name = Name_Updated;
            PersonController.Update(Person);
            PersonController.Archive(Person);
            Person = PersonController.Item(Person.InstanceId);

            var ItemsAtEnd = PersonController.List().Count;

            //Make sure our count hasn't changed since the item was archived.
            Assert.AreEqual(ItemsAtStart, ItemsAtEnd);
        }


    }
}
