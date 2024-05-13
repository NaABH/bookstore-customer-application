namespace BookStore.Tests;

using Xunit;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using BookStore.Models;

public class CustomerServiceTests
{
    private CustomerDb _context;
    private CustomerService _service;

    public CustomerServiceTests()
    {
        // Create a new in-memory database
        var options = new DbContextOptionsBuilder<CustomerDb>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;

        _context = new CustomerDb(options);
        _context.Customers.Add(new Customer { id = 1, firstName = "John", lastName = "Doe", email = "john@example.com" });
        _context.Customers.Add(new Customer { id = 2, firstName = "Jane", lastName = "Smith", email = "jane@example.com" });
        _context.SaveChanges();
        _service = new CustomerService(_context);
    }

    // Test GetCustomersAsync method
    [Fact]
    public async Task GetCustomersAsync_ReturnsListOfCustomers()
    {
        var result = await _service.GetCustomersAsync();
        var expectedCustomer = new Customer { id = 1, firstName = "John", lastName = "Doe", email = "john@example.com" };

        Assert.Equal(2, result.Count);
        Assert.Equal("John", result[0].firstName);
        Assert.Equal("Jane", result[1].firstName);
        Assert.Equal(expectedCustomer.firstName, result[0].firstName);
        Assert.Equal(expectedCustomer.lastName, result[0].lastName);
        Assert.Equal(expectedCustomer.email, result[0].email);
    }

    // Test GetCustomerByIdAsync method
    [Fact]
    public async Task GetCustomerByIdAsync_ReturnsCustomer()
    {

        var result = await _service.GetCustomerAsync(1);

        Assert.NotNull(result);
        Assert.Equal(1, result.id);
        Assert.Equal("John", result.firstName);
        Assert.Equal("Doe", result.lastName);
        Assert.Equal("john@example.com", result.email);
    }

}
