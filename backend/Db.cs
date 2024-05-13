using Microsoft.EntityFrameworkCore;

namespace BookStore.Models;

public record Customer
{
    public int id { get; set; }
    public string? firstName { get; set; }
    public string? lastName { get; set; }
    public string? email { get; set; }
}

public class CustomerDb : DbContext
{
    public CustomerDb(DbContextOptions options) : base(options) { }
    public virtual DbSet<Customer> Customers { get; set; } = null!;
}
