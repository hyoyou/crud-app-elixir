defmodule CrudAppWeb.PageController do
  use CrudAppWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
