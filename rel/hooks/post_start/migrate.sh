set +e

echo "Preparing to run migrations"

while true; do
  nodetool ping
  EXIT_CODE=$?
  if [ $EXIT_CODE -eq 0 ]; then
    echo "Application is up!"
    break
  fi
done

set -e

echo "Running migrations"
bin/crud_app rpc "Elixir.CrudApp.ReleaseTasks.migrate"
echo "Migrations ran successfully"