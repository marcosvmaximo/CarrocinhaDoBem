using CarrocinhaDoBem.Api.Context;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using webApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuração do ambiente
var environment = builder.Environment;

// Configuração de serviços
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();

// Configuração de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", builder =>
    {
        builder.AllowAnyOrigin();
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
    });
});

// Configuração do banco de dados
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException("builder.Configuration.GetConnectionString(\"DefaultConnection\")");
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

// Configuração do AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Configuração de sessão
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Tempo de expiração da sessão (30 minutos)
});

// Registro de serviços
builder.Services.AddScoped<DataContext>();
builder.Services.AddTransient<IPasswordService, PasswordService>();

var app = builder.Build();

// Configuração do pipeline de middleware
if (environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("AllowAnyOrigin");

app.UseAuthentication();
app.UseAuthorization();

app.UseSession(); // Habilita o uso de sessões

app.MapControllers();

// Middleware global para tratamento de erros
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        var response = new { message = ex.Message };
        await context.Response.WriteAsJsonAsync(response);
    }
});

app.Run();
