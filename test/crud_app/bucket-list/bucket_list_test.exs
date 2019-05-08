defmodule CrudApp.BucketListTest do
  use CrudApp.DataCase

  alias CrudApp.BucketList

  describe "goals" do
    alias CrudApp.BucketList.Goal

    @valid_attrs %{activity: "some activity", is_achieved: false, location: "some location"}
    @update_attrs %{activity: "some updated activity", is_achieved: true, location: "some updated location"}
    @invalid_attrs %{activity: nil, is_achieved: nil, location: nil}

    def goal_fixture(attrs \\ %{}) do
      {:ok, goal} =
        attrs
        |> Enum.into(@valid_attrs)
        |> BucketList.create_goal()

      goal
    end

    test "list_goals/0 returns all goals" do
      goal = goal_fixture()
      assert BucketList.list_goals() == [goal]
    end

    test "get_goal!/1 returns the goal with given id" do
      goal = goal_fixture()
      assert BucketList.get_goal!(goal.id) == goal
    end

    test "create_goal/1 with valid data creates a goal" do
      assert {:ok, %Goal{} = goal} = BucketList.create_goal(@valid_attrs)
      assert goal.activity == "some activity"
      assert goal.is_achieved == false
      assert goal.location == "some location"
    end

    test "create_goal/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = BucketList.create_goal(@invalid_attrs)
    end
  end
end