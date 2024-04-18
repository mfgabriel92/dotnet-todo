using Microsoft.EntityFrameworkCore;
using Todo.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("todos"));

var app = builder.Build();

app.UseCors(policyBuilder => policyBuilder
    .WithOrigins("http://localhost:5173", "http://localhost:3001")
    .AllowAnyMethod()
    .AllowAnyHeader()
);

app.MapGet("/todos", async (TodoDb db) => await db.Todos.ToListAsync());
app.MapGet("/todos/{id}", async (int id, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo == null) return Results.NotFound();

    return Results.Ok(todo);
});
app.MapPost("/todos", async (Todo.Api.Models.Todo item, TodoDb db) =>
{
    db.Todos.Add(item);
    await db.SaveChangesAsync();
    return Results.Created($"/todos/{item.Id}", item);
});
app.MapPut("/todos/{id}", async (Todo.Api.Models.Todo item, int id, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo == null) return Results.NotFound();

    todo.Description = item.Description;
    todo.IsComplete = item.IsComplete;

    await db.SaveChangesAsync();
    return Results.Ok(todo);
});
app.MapDelete("/todos/{id}", async (int id, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo == null) return Results.NotFound();

    db.Todos.Remove(todo);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();