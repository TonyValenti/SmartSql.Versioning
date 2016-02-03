using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace SmartSql.Versioning.Test {
    public class ProductsController : ApiController
    {
        Product[] qproducts = new Product[] 
        { 
            new Product { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 }, 
            new Product { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M }, 
            new Product { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M } 
        };

        public IEnumerable<Product> GetAllProducts()
        {
            return qproducts;
        }

        public IHttpActionResult GetProduct(int id)
        {
            var product = qproducts.FirstOrDefault((p) => p.Id == id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpGet()]
        public IHttpActionResult DoSomething(int id) {
            return null;
        }

    }
}
