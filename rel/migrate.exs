defmodule CrudAppWeb.ReleaseTasks do
    def migrate do
      {:ok, _} = Application.ensure_all_started(:crud_app)
  
      path = Application.app_dir(:crud_app, "priv/repo/migrations")
  
      Ecto.Migrator.run(CrudApp.Repo, path, :up, all: true)
    end
  end