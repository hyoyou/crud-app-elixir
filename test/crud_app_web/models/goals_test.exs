# defmodule CrudAppWeb.GoalsTest do
#   use CrudApp.DataCase

#   describe "goals" do
#     alias CrudApp.BucketList
#     alias CrudApp.BucketList.Goal
    
#     @valid_attrs %{activity: "walk the Great Wall of China", location: "Huairou, China"}
#     @invalid_attrs %{activity: nil, location: nil, is_achieved: false}

#     test "create_goal/1 with valid data creates a goal" do
#       assert {:ok, %Goal{} = goal} = Goal.create_goal(@valid_attrs)
#       assert goal.activity == "walk the Great Wall of China"
#       assert goal.location == "Huairou, China"
#       assert goal.is_achieved == false
#     end

#     test "create_goal/1 with invalid data returns error changeset" do
#       assert {:error, %Ecto.Changeset{}} = Goal.create_goal(@invalid_attrs)
#     end
#   end 
# end