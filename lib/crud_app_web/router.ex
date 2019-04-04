defmodule CrudAppWeb.Router do
  use CrudAppWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", CrudAppWeb do
    pipe_through :api
    
    resources "/goals", GoalController
  end

  scope "/", CrudAppWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
