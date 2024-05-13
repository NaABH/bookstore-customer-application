using BookStore.Models;
using System.Threading.Tasks;

public interface ICustomerService
{
    Task<List<Customer>> GetCustomersAsync();
    Task<Customer?> GetCustomerAsync(int id);
    Task<Customer> CreateCustomerAsync(Customer customer);
    Task<Customer> UpdateCustomerAsync(int id, Customer updateCustomer);
    Task<bool> DeleteCustomerAsync(int id);
}
