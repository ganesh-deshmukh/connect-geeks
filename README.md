# connect-geeks

#steps I took to build complete project

1.npm init

2.installed required modules

3.installed dev-dependencies. e.g. nodemon(which is used only during development phase)

4.setup of 'script-tool' to copy output of terminal in steps.txt file.

5.basic express setup.

by importing express,calling express by variable app, app.get, listening to request at port.

6.configured database with URI and DB credentials

7.finished setup of Express routes for post, profiles and users

8.create router as 'const router = express.Router();
|-> don't forget parenthesis, otherwise it throws error of "TypeError: Cannot read property 'push' of undefined"

9.create models for each route eg.for user(auth0) and profile(all details of user).

10.Model name convention is same as classes in Java- start with Capital letter and singular.

11.Added route for registration.

12.Add bodyparser to accept data from front-end.

13.Add avator from npm-gravator.

14.store password in encrypted form using "genSalt()" for round of salts value=10;

15.then create hash using that salt.

16.If 'unhandled error: listen EADDR_IN_USE:::5000' occurs then run 'killall node'

17.create model of Profile to save details of Profile

18.create current user profile route

19.Update profile routes creation

20.validate profile details,eg. handle
