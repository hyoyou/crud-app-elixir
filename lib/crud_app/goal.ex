defmodule CrudApp.Goal do
  use Ecto.Schema
  import Ecto.Changeset


  schema "goals" do
    field :achieved, :boolean, default: false
    field :activity, :string
    field :location, :string

    timestamps()
  end

  @doc false
  def changeset(goal, attrs) do
    goal
    |> cast(attrs, [:activity, :location, :achieved])
    |> validate_required([:activity, :location, :achieved])
  end
end
