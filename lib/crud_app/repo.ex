defmodule CrudApp.Repo do
  use Ecto.Repo,
    otp_app: :crud_app,
    adapter: Ecto.Adapters.Postgres

  def init(_, opts) do
    opts = opts
    |> Keyword.put(:show_sensitive_data_on_connection_error, true)

    {:ok, opts}
  end
end