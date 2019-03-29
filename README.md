# CrudApp [![TravisCI](https://travis-ci.org/hyoyou/crud-app-elixir.svg?branch=master)]

[Production Application URL](http://crud-app-dev.us-east-1.elasticbeanstalk.com/#/)

## Prerequisites
* Elixir 1.5
* Phoenix 1.4.1
* PostgreSQL 11
* Docker 2
* npm to install Node.js dependencies

## Setup
* Create Distillery release with:

```
$ mix release
```

* Install dependencies with:

```
$ mix deps.get
```

* Create and migrate your database with:

```
$ mix ecto.setup
```

* Install Node.js dependencies with: 

```
$ cd assets && npm install
```



* To use Docker, run Makefile build task with:

```
$ make build
```

## Running the Tests
* To run Phoenix tests:

```
$ mix test
```

* To run Vue.js tests:

```
$ cd assets && npm run test:unit
```

## Running the Server

* To start your Phoenix server: 

```
$ mix phx.server
``` 
& navigate to localhost:[port #] that is output to terminal



* To use Docker, run Makefile run task with:

```
$ make run
```