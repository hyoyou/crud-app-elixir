ARG ALPINE_VERSION=3.9

FROM elixir:1.8.1-alpine AS build

ENV APP_NAME=crud_app \
    MIX_ENV=prod

ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

RUN apk update && \
  apk upgrade --no-cache && \
  apk add --no-cache \
    nodejs \
    npm \
    git \
    build-base && \
  mix local.rebar --force && \
  mix local.hex --force

# This copies our app source code into the build container
COPY . .

RUN mix do deps.get, deps.compile, compile

# This step builds assets for the Phoenix app
RUN cd assets && \
    npm install && \
    npm run build && \
    cd .. && \
    mix phx.digest

RUN mkdir -p /built && \
    mix release --verbose && \
    cp _build/prod/rel/crud_app/releases/0.1.0/crud_app.tar.gz /built && \
    cd /built && \
    tar -xzf crud_app.tar.gz && \
    rm crud_app.tar.gz

# From this line onwards, we're in a new image, which will be the image used in production
FROM alpine:3.9

# The name of your application/release (required)
RUN apk update && \
    apk add --no-cache \
      bash \
      openssl-dev

ENV APP_NAME=crud_app \
    MIX_ENV=prod \
    APP_HOME=/app

EXPOSE 4000

COPY --from=build /built /app

CMD /app/bin/crud_app foreground