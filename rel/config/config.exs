use Mix.Config

config :crud_app, CrudApp.Repo,
  database: System.get_env("BL_DATABASE_DB"),
  username: System.get_env("BL_DATABASE_USER"),
  password: System.get_env("BL_DATABASE_PASS"),
  hostname: System.get_env("BL_DATABASE_HOST"),
  port: System.get_env("BL_DATABASE_PORT"),
  ssl: true,
  pool_size: 15

# port = String.to_integer(System.get_env("PORT") || "8080")
config :crud_app, CrudApp.Endpoint,
  http: [:inet6, port: 4000],
  url: [scheme: "http", host: System.get_env("BL_HOSTNAME"), port: 80],
  server: true,
  cache_static_manifest: "priv/static/cache_manifest.json",
  secret_key_base: System.get_env("BL_SECRET_KEY_BASE")