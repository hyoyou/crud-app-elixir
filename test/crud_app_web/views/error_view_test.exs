defmodule CrudAppWeb.ErrorViewTest do
  use CrudAppWeb.ConnCase, async: true

  import Phoenix.View
  
  @not_found %{detail: "Endpoint Not Found"}
  @server_error %{detail: "Internal Server Error"}

  test "renders 404.json" do
    assert render(CrudAppWeb.ErrorView, "404.json", []) == %{errors: @not_found}
  end

  test "renders 500.json" do
    assert render(CrudAppWeb.ErrorView, "500.json", []) == %{errors: @server_error}
  end
end