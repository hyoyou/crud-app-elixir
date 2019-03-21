defmodule CrudAppWeb.GoalController do
  use CrudAppWeb, :controller

  alias CrudApp.BucketList
  alias CrudApp.BucketList.Goal
  
  action_fallback CrudAppWeb.FallbackController

  def index(conn, _params) do
    goals = BucketList.list_goals()
    render(conn, "index.json", goals: goals)
  end

  def create(conn, %{"goal" => goal_params}) do
    with {:ok, %Goal{} = goal} <- BucketList.create_goal(goal_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.goal_path(conn, :show, goal))
      |> render("show.json", goal: goal)
    end
  end

  def show(conn, %{"id" => id}) do
    goal = BucketList.get_goal!(id)
    render(conn, "show.json", goal: goal)
  end
end