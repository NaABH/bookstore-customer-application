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
builder.Services.AddDbContext<CustomerDb>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
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

// Map the routes
app.MapGet("/customer", async (ICustomerService service) => await service.GetCustomersAsync());
app.MapPost("/customer", async (ICustomerService service, Customer customer) =>
        {
            try
            {
                return Results.Created($"/customer/{customer.id}", await service.CreateCustomerAsync(customer));
            }
            catch (InvalidOperationException e)
            {
                return Results.Conflict(e.Message);
            }
        });

app.MapGet("/customer/{id}", async (ICustomerService service, int id) => await service.GetCustomerAsync(id));
app.MapPut("/customer/{id}", async (ICustomerService service, Customer updateCustomer, int id) =>
{
    try
    {
        return Results.Ok(await service.UpdateCustomerAsync(id, updateCustomer));
    }
    catch (InvalidOperationException e)
    {
        return Results.Conflict(e.Message);
    }

});
app.MapDelete("/customer/{id}", async (ICustomerService service, int id) =>
{
    var result = await service.DeleteCustomerAsync(id);
    return result ? Results.Ok() : Results.NotFound();
});

app.Run();
