# Invade The Rift

* [Introduction](#introduction)
* [Setup](#setup)
* [Testing](#testing)
* [Usage](#usage)

### Introduction
I've created this with the intent to inform those who love games, but especially those who love playing the game, League of Legends (League for short). It's a place where you can find an abundance of information from champions to items as well as a forum created to have discussion amongst like-minded individuals. README will be updated with features as this further develops!

### Setup
Setup is simple since you just need to run `npm start` and the app is up and running!

### Testing
I've made test specs if you wish to run tests on the app features.  
1. `static_spec.js` which tests the landing page.
2. `user_spec.js` which tests behavior of account creation.
3. `users_spec.js` which tests for user resource.
4. `forums_spec.js` which tests for forum resource.
5. `forum_spec.js` which tests behavior of discussion feature.
6. `posts_spec.js` which tests for post resource.
7. `post_spec.js` which tests behavior of post resource.
8. `champRotation_spec.js` which tests for the champ rotation resource.

**NOTE:** If champRotation_spec fails and page doesn't load, it's because of the API used for development that RIOT uses. RIOT has it's dev API keys on a 24-hour duration until it expires and you need to register for a new one.

All can be run with `npm test spec/(spec_folder)/(test_spec_here.js)`.
(Further specs will be available when features are in progress)

### Usage
Upon launching, you'll be presented with the landing page which displays the latest official League news and latest discussions. The navbar above will direct you whatever feature piques your interest! You can create an account which then provides you access to your profile page as well as forum features such as discussion/post CRUD options.
