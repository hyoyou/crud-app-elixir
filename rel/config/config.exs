use Mix.Config

config :crud_app, CrudApp.Repo,
  adapter: Ecto.Adapters.Postgres,
  database: System.get_env("POSTGRES_DB"),
  username: System.get_env("POSTGRES_USER"),
  password: System.get_env("POSTGRES_PASS"),
  hostname: System.get_env("POSTGRES_HOST"),
  port: System.get_env("PORT"),
  pool_size: 15

config :crud_app, CrudApp.Endpoint,
  http: [:inet6, port: 4000],
  url: [scheme: "http", host: System.get_env("HOST"), port: 80],
  server: true,
  cache_static_manifest: "priv/static/cache_manifest.json",
  secret_key_base: System.get_env("SECRET_KEY_BASE")