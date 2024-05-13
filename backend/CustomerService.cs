using BookStore.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public class CustomerService : ICustomerService
{
    private readonly CustomerDb _db;

    public CustomerService(CustomerDb db)
    {
        _db = db;
    }

    public async Task<List<Customer>> GetCustomersAsync()
    {
        return await _db.Customers.ToListAsync();
    }

    public async Task<Customer?> GetCustomerAsync(int id)
    {
        var customer = await _db.Customers.FindAsync(id);
        if (customer == null)
            return null; // or throw an exception

        return customer;
    }

    public async Task<Customer> CreateCustomerAsync(Customer customer)
    {
        var existingCustomer = await _db.Customers.FirstOrDefaultAsync(c => c.email == customer.email);
        if (existingCustomer != null)
            throw new InvalidOperationException("A customer with the same email already exists.");
        await _db.Customers.AddAsync(customer);
        await _db.SaveChangesAsync();
        return customer;
    }

    public async Task<Customer> UpdateCustomerAsync(int id, Customer updateCustomer)
    {
        var customer = await _db.Customers.FindAsync(id);
        if (customer == null)
            throw new InvalidOperationException("Customer not found.");

        customer.firstName = updateCustomer.firstName;
        customer.lastName = updateCustomer.lastName;
        customer.email = updateCustomer.email;
        await _db.SaveChangesAsync();
        return customer;
    }

    public async Task<bool> DeleteCustomerAsync(int id)
    {
        var customer = await _db.Customers.FindAsync(id);
        if (customer == null)
            return false; // or throw an exception

        _db.Customers.Remove(customer);
        await _db.SaveChangesAsync();
        return true;
    }
}
