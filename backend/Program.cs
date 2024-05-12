using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using BookStore.Models;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("Customers") ?? "Data Source=Customers.db";

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSqlite<CustomerDb>(connectionString);
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "BookStore API", Description = "Enjoy Reading Your Books", Version = "v1" });
});

// 1) define a unique string
string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// 2) define allowed domains, in this case "http://example.com" and "*" = all
//    domains, for testing purposes only.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
      builder =>
      {
          builder.WithOrigins(
            "*");
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

// 3) use the capability
app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/", () => "Hello World!");
app.MapGet("/customer", async (CustomerDb db) => await db.Customers.ToListAsync());
app.MapPost("/customer", async (CustomerDb db, Customer customer) =>
{
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
