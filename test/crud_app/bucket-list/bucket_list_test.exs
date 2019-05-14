defmodule CrudApp.BucketListTest do
  use CrudApp.DataCase

  alias CrudApp.BucketList

  describe "goals" do
    alias CrudApp.BucketList.Goal

    @valid_attrs %{activity: "some fun activity", is_achieved: false, location: "some cool location"}
    @update_attrs %{is_achieved: true}
    @invalid_attrs %{activity: nil, is_achieved: nil, location: nil}

    def goal_fixture(attrs \\ %{}) do
      {:ok, goal} =
        attrs
        |> Enum.into(@valid_attrs)
        |> BucketList.create_goal()

      goal
    end

    test "list_goals/0 returns empty list when no current goals exist" do
      assert BucketList.list_goals() == []
    end

    test "list_goals/0 returns all current goals" do
      goal = goal_fixture()
      assert BucketList.list_goals() == [goal]
    end

    test "list_achieved_goals/0 returns empty list when no achieved goals exist" do
      goal = goal_fixture()
      assert BucketList.list_achieved_goals == []
    end

    test "list_achieved_goals/0 returns all achieved goals" do
      goal = goal_fixture(@update_attrs)
      assert BucketList.list_achieved_goals == [goal]
    end

    test "get_goal!/1 returns the goal with given id" do
      goal = goal_fixture()
      assert BucketList.get_goal!(goal.id) == goal
    end

    test "create_goal/1 with valid data creates a goal" do
      assert {:ok, %Goal{} = goal} = BucketList.create_goal(@valid_attrs)
      assert goal.activity == "some fun activity"
      assert goal.is_achieved == false
      assert goal.location == "some cool location"
    end

    test "create_goal/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = BucketList.create_goal(@invalid_attrs)
    end

    test "update_goal/2 with valid data updates a goal" do
      goal = goal_fixture()
      assert {:ok, %Goal{} = goal} = BucketList.update_goal(goal, @update_attrs)
      assert goal.is_achieved == true
    end

    test "update_goal/2 with invalid data returns error changeset" do
      goal = goal_fixture()
      assert {:error, %Ecto.Changeset{}} = BucketList.update_goal(goal, @invalid_attrs)
    end
  end
end