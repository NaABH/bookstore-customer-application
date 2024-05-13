using Xunit;
using Moq;
using Microsoft.EntityFrameworkCore;
using BookStore.Models;
using System.Linq;
using System.Threading.Tasks;

public class CustomerRoutesTests
{
    private readonly Mock<DbSet<Customer>> _mockCustomers;
    private readonly CustomerDb _db;

    public CustomerRoutesTests()
    {
        // Initialize the mock set
        _mockCustomers = new Mock<DbSet<Customer>>();

        // Initialize the mock context
        var mockContext = new Mock<CustomerDb>();
        mockContext.Setup(c => c.Customers).Returns(_mockCustomers.Object);

        // Use the mock context for testing
        _db = mockContext.Object;
    }

    [Fact]
    public async Task GetAllCustomers_ReturnsExpectedCustomers()
    {
        // Arrange
        var customers = new List<Customer> { new Customer { id = 1, firstName = "John", lastName = "Doe", email = "john.doe@example.com" } };
        _mockCustomers.Setup(m => m.ToListAsync(default)).ReturnsAsync(customers);

        // Act
        var result = await _db.Customers.ToListAsync();

        // Assert
        Assert.Equal(customers, result);
    }

}
