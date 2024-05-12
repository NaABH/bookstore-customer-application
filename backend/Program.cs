using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using BookStore.Models;

const string CorsPolicyName = "MyAllowSpecificOrigins";
const string SwaggerVersion = "v1";

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("Customers") ?? "Data Source=Customers.db";
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSqlite<CustomerDb>(connectionString);
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc(SwaggerVersion, new OpenApiInfo { Title = "BookStore API", Description = "Enjoy Reading Your Books", Version = "v1" });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CorsPolicyName,
      builder =>
      {
          builder.WithOrigins(allowedOrigins!);
      });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "BookStore API V1");
    });
}

app.UseCors(CorsPolicyName);

app.MapGet("/", () => "Hello World!");
app.MapGet("/customer", async (CustomerDb db) => await db.Customers.ToListAsync());
app.MapPost("/customer", async (CustomerDb db, Customer customer) =>
{
    var existingCustomer = await db.Customers
        .Where(c => c.email == customer.email)
        .FirstOrDefaultAsync();

    if (existingCustomer != null)
    {
        return Results.Conflict("A customer with the same email already exists.");
    }

    await db.Customers.AddAsync(customer);
    await db.SaveChangesAsync();
    return Results.Created($"/customer/{customer.id}", customer);
});
app.MapGet("/customer/{id}", async (CustomerDb db, int id) => await db.Customers.FindAsync(id));
app.MapPut("/customer/{id}", async (CustomerDb db, Customer updatecustomer, int id) =>
{
    var customer = await db.Customers.FindAsync(id);
    if (customer is null) return Results.NotFound();
    customer.firstName = updatecustomer.firstName;
    customer.lastName = updatecustomer.lastName;
    customer.email = updatecustomer.email;
    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapDelete("/customer/{id}", async (CustomerDb db, int id) =>
{
    var customer = await db.Customers.FindAsync(id);
    if (customer is null)
    {
        return Results.NotFound();
    }
    db.Customers.Remove(customer);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.Run();
