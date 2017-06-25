# idea-board Server

  ## Config file

  You must create a `.config` file in this directory to provide your own configuration.

  Lines that begins by `#` are considered as comments. 

  Here is a template for required keys

  ```
    DATABASE_HOST=localhost
    DATABASE_PORT=1338
    DATABASE_NAME=idea-board
  ```

  ## Database

  Idea-board's database is `mongodb`, you need to install it before getting started.

  Then, run a mongo daemon on the same host and port that you provided in the idea-project's `.config` file.

  Once your server is running, run the following node script to bootstrap the mongodb databse.

  ```
    node database/scripts/install.js
  ```