# idea-board Server

  ## Config file

  You must create a `.env` file in this directory to provide your own configuration.

  Lines that begins by `#` are considered as comments. 

  You can find a template file in this directory named `env_template` for required keys to get quickly started.

  ## Database

  Idea-board's database is `mongodb`, you need to install it before getting started.

  Then, run a mongo daemon on the same host and port that you provided in the idea-project's `.env` file.

  **If you want to be able to run tests, don't forget to provide these keys (`TEST_DATABASE_NAME`, `TEST_SERVER_PORT`) in the `.env` file.**

  Once your server is running, run the following npm scripts to bootstrap the mongodb database.

  ```
    npm run db:migrate
  ```

  # Tests

  **Before testing Make sure that you created a test database (see Database in this README)**

  Before runing test, don't forget to provide test environement variables in your `.env`, you can find the required variables under the `#test` block in the `env_template` file.

  Then, run the following command to start tests.

  ```
    npm run test:unit:watch
    npm run test:integration:watch
  ```

  Note that you can run your test watchers concurently while your development app is still running.
