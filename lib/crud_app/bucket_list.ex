defmodule CrudApp.BucketList do
  import Ecto.Query, warn: false
  alias CrudApp.Repo

  alias CrudApp.BucketList.Goal

  def list_goals do
    Repo.all(Goal)
  end

  def get_goal!(id), do: Repo.get!(Goal, id)

  def create_goal(attrs \\ %{}) do
    %Goal{}
    |> Goal.changeset(attrs)
    |> Repo.insert()
  end

  def update_goal(%Goal{} = goal, attrs) do
    goal
    |> Goal.changeset(attrs)
    |> Repo.update()
  end

  def delete_goal(%Goal{} = goal) do
    Repo.delete(goal)
  end

  def change_goal(%Goal{} = goal) do
    Goal.changeset(goal, %{})
  end
end