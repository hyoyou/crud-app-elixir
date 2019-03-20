defmodule CrudAppWeb.PageControllerTest do
  use CrudAppWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Travel Bucket List"
  end
end
