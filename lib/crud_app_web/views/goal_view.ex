defmodule CrudAppWeb.GoalView do
  use CrudAppWeb, :view
  alias CrudAppWeb.GoalView

  def render("index.json", %{goals: goals}) do
    %{data: render_many(goals, GoalView, "goal.json")}
  end

  def render("show.json", %{goal: goal}) do
    %{data: render_one(goal, GoalView, "goal.json")}
  end

  def render("goal.json", %{goal: goal}) do
    %{id: goal.id, activity: goal.activity, location: goal.location, is_achieved: goal.is_achieved}
  end
end  