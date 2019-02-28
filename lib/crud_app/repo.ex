defmodule CrudApp.Repo do
  use Ecto.Repo,
    otp_app: :crud_app,
    adapter: Ecto.Adapters.Postgres
end
