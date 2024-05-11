using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using BookStore.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<CustomerDb>(options => options.UseInMemoryDatabase("items"));
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "BookStore API", Description = "Enjoy Reading Your Books", Version = "v1" });
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

app.MapGet("/", () => "Hello World!");
app.MapGet("/customers", async (CustomerDb db) => await db.Customers.ToListAsync());
app.MapPost("/customer", async (CustomerDb db, Customer customer) =>
{
    await db.Customers.AddAsync(customer);
    await db.SaveChangesAsync();
    return Results.Created($"/customer/{customer.Id}", customer);
});
app.MapGet("/customer/{id}", async (CustomerDb db, int id) => await db.Customers.FindAsync(id));
app.MapPut("/customer/{id}", async (CustomerDb db, Customer updatecustomer, int id) =>
{
      var customer = await db.Customers.FindAsync(id);
      if (customer is null) return Results.NotFound();
      customer.FirstName = updatecustomer.FirstName;
      customer.LastName = updatecustomer.LastName;
      customer.Email = updatecustomer.Email;
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
