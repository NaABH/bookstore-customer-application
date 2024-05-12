using Microsoft.EntityFrameworkCore;

namespace BookStore.Models; 

 public record Customer
{
    public int id { get; set; }
    public string? firstName { get; set; }
    public string? lastName { get; set; }
    public string? email { get; set; }
}

public class CustomerDb: DbContext
{
    public CustomerDb(DbContextOptions options) : base(options) { }
    public DbSet<Customer> Customers { get; set; } = null!;
}


// {
//     private static List<Customer> _customers = new List<Customer>()
//    {
//      new Customer{ Id=1, FirstName="F1", LastName="L1", Email="email1@example.com"},
//      new Customer{ Id=2, FirstName="F2", LastName="L2", Email="email2@example.com"},
//      new Customer{ Id=3, FirstName="F3", LastName="L3", Email="email3@example.com"}
//    };

//     // get customer list
//     public static List<Customer> GetCustomers()
//     {
//         return _customers;
//     }

//     // get customer by id
//     public static Customer? GetCustomer(int id)
//     {
//         return _customers.SingleOrDefault(customer => customer.Id == id);
//     }

//     // add customer
//     public static Customer CreateCustomer(Customer customer)
//     {
//         _customers.Add(customer);
//         return customer;
//     }

//     // update customer
//     public static Customer UpdateCustomer(Customer update)
//     {
//         _customers = _customers.Select(customer =>
//         {
//             if (customer.Id == update.Id)
//             {
//                 customer.FirstName = update.FirstName;
//                 customer.LastName = update.LastName;
//                 customer.Email = update.Email;
//             }
//             return customer;
//         }).ToList();

//         return update;
//     }

//     // delete customer
//     public static void RemoveCustomer(int id)
//     {
//         _customers = _customers.FindAll(customer => customer.Id != id).ToList();
//     }
// }