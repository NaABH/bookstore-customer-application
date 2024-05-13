using BookStore.Models;

// Interface for the CustomerService (CRUD operations)
public interface ICustomerService
{
    Task<List<Customer>> GetCustomersAsync();
    Task<Customer?> GetCustomerAsync(int id);
    Task<Customer> CreateCustomerAsync(Customer customer);
    Task<Customer> UpdateCustomerAsync(int id, Customer updateCustomer);
    Task<bool> DeleteCustomerAsync(int id);
}
