using Microsoft.EntityFrameworkCore;

namespace Todo.Api;

public class TodoDb : DbContext
{
    public TodoDb(DbContextOptions<TodoDb> options) : base(options)
    {
    }

    public DbSet<Models.Todo> Todos { get; set; }
}