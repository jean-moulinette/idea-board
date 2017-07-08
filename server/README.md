# idea-board Server

  ## Config file

  You must create a `.config` file in this directory to provide your own configuration.

  Lines that begins by `#` are considered as comments. 

  You can find a template file in this directory named `config_template` for required keys to get quickly started.

  ## Database

  Idea-board's database is `mongodb`, you need to install it before getting started.

  Then, run a mongo daemon on the same host and port that you provided in the idea-project's `.config` file.

  Once your server is running, run the following npm scripts to bootstrap the mongodb database.

  ```
    npm run db:migrate
    npm run db:seed
  ```