defmodule CrudAppWeb.GoalControllerTest do
  use CrudAppWeb.ConnCase

  alias CrudApp.BucketList
  alias CrudApp.BucketList.Goal

  @create_attrs %{activity: "some activity", location: "some location", is_achieved: false}
  @invalid_attrs %{activity: nil, location: nil}

  def fixture(:goal) do
    {:ok, goal} = BucketList.create_goal(@create_attrs)
    goal
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "is empty when no goals are created", %{conn: conn} do
      conn = get(conn, Routes.goal_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end

    test "list all current goals", %{conn: conn} do
      conn = post(conn, Routes.goal_path(conn, :create), goal: @create_attrs)
      goal = conn.assigns.goal
      conn = get(conn, Routes.goal_path(conn, :index))
      assert json_response(conn, 200)["data"] == [%{"activity" => "some activity", "id" => goal.id, "is_achieved" => false, "location" => "some location"}]
    end
  end

  describe "create goal" do
    test "renders goal when data is valid", %{conn: conn} do
      conn = post(conn, Routes.goal_path(conn, :create), goal: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.goal_path(conn, :show, id))

      assert %{
               "id" => id,
               "activity" => "some activity",
               "location" => "some location",
               "is_achieved" => false
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.goal_path(conn, :create), goal: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update goal" do
    setup [:create_goal]

    test "renders updated goals when a goal has been marked achieved", %{conn: conn, goal: goal} do
      conn = put(conn, Routes.goal_path(conn, :update, goal.id), goal: %{id: goal.id, is_achieved: true})
      assert json_response(conn, 200)["data"]
    end
  end

  describe "achieved index" do
    setup [:create_goal]

    test "list all achieved goals", %{conn: conn, goal: goal} do
      conn = put(conn, Routes.goal_path(conn, :update, goal.id), goal: %{id: goal.id, is_achieved: true})
      conn = get(conn, Routes.goal_path(conn, :achieved_index))
      assert json_response(conn, 200)["data"] == [%{"activity" => "some activity", "id" => goal.id, "is_achieved" => true, "location" => "some location"}]
    end
  end

  defp create_goal(_) do
    goal = fixture(:goal)
    {:ok, goal: goal}
  end
end