defmodule CrudApp.Repo.Migrations.CreateGoals do
  use Ecto.Migration

  def change do
    create table(:goals) do
      add :activity, :string
      add :location, :string
      add :is_achieved, :boolean, default: false, null: false

      timestamps()
    end

  end
end
