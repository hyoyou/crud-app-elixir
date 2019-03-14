defmodule CrudAppWeb.PageController do
  use CrudAppWeb, :controller

  def index(conn, _) do
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> Plug.Conn.send_file(200, Application.app_dir(:crud_app, "priv/static/index.html"))
    |> halt()
  end
end
