ARG ALPINE_VERSION=3.9

FROM elixir:1.8.1-alpine AS builder

EXPOSE 4000

# The following are build arguments used to change variable parts of the image.
# The name of your application/release (required)
# ARG APP_NAME=crud_app
# # The version of the application we are building (required)
# ARG APP_VSN=0.1.0
# # The environment to build with
# ARG MIX_ENV=prod
# # Set this to true if this release is not a Phoenix app
# ARG SKIP_PHOENIX=false
# # If you are using an umbrella project, you can change this
# # argument to the directory the Phoenix app is in so that the assets
# # can be built
# ARG PHOENIX_SUBDIR=.
# SKIP_PHOENIX=${SKIP_PHOENIX} \
ENV APP_NAME=crud_app \
    APP_VSN=0.1.0 \
    MIX_ENV=prod

# By convention, /opt is typically used for applications
WORKDIR /app

# This step installs all the build tools we'll need
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

# This step builds assets for the Phoenix app (if there is one)
# If you aren't building a Phoenix app, pass `--build-arg SKIP_PHOENIX=true`
# This is mostly here for demonstration purposes
RUN cd assets && \
    npm install && \
    npm run build && \
    cd .. && \
    mix phx.digest

RUN \
  mkdir -p /built && \
  mix release --verbose && \
  cp _build/prod/rel/crud_app/releases/0.1.0/crud_app.tar.gz /built && \
  cd /built && \
  tar -xzf crud_app.tar.gz && \
  rm crud_app.tar.gz

# From this line onwards, we're in a new image, which will be the image used in production
FROM alpine:3.9

# The name of your application/release (required)
ARG APP_NAME=crud_app

RUN apk update && \
    apk add --no-cache \
      bash \
      openssl-dev

ENV REPLACE_OS_VARS=true \
    APP_NAME=crud_app \
    MIX_ENV=prod

WORKDIR /app

COPY --from=build /built /app/.

CMD /app/bin/crud_app foreground