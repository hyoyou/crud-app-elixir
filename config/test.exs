use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :crud_app, CrudAppWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

config :crud_app, CrudApp.Repo,
  username: "postgres",
  password: "postgres",
  database: "crud_app_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox