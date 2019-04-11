# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :crud_app, CrudApp.Repo,
  database: System.get_env("BL_DATABASE_DB"),
  username: System.get_env("BL_DATABASE_USER"),
  password: System.get_env("BL_DATABASE_PASS"),
  hostname: System.get_env("BL_DATABASE_HOST"),
  types: SplitGym.PostgresTypes,
  pool_size: 20

config :crud_app,
  ecto_repos: [CrudApp.Repo]

# Configures the endpoint
config :crud_app, CrudAppWeb.Endpoint,
  url: [host: System.get_env("BL_HOSTNAME")],
  secret_key_base: System.get_env("BL_SECRET_KEY_BASE"),
  render_errors: [view: CrudAppWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: CrudApp.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
