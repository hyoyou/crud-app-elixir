defmodule CrudAppWeb.Goal do
  use Ecto.Schema
  import Ecto.Changeset


  schema "goals" do
    field :is_achieved, :boolean, default: false
    field :activity, :string
    field :location, :string

    timestamps()
  end

  @doc false
  def changeset(goal, attrs) do
    goal
    |> cast(attrs, [:activity, :location, :is_achieved])
    |> validate_required([:activity, :location, :achieved])
  end
end