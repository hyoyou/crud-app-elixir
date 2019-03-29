defmodule CrudAppWeb.ErrorView do
  use CrudAppWeb, :view
  
  @not_found %{detail: "Endpoint Not Found"}
  @server_error %{detail: "Internal Server Error"}

  def render("404.json", _assigns) do
    %{errors: @not_found}
  end

  def render("500.json", _assigns) do
    %{errors: @server_error}
  end

  def template_not_found(template, _assigns) do
    %{errors: %{detail: Phoenix.Controller.status_message_from_template(template)}}
  end
end