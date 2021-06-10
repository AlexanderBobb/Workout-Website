

# Elite Training

## Overview



Health is a important topic now a days and with the growing popularity in working out and lifting there is an increase in demand for people wanting to learn how to train. This is were Elite Training comes in. Recently I was looking into a weight training app to give me some simple workout plans and I could not find a descent one that was not shoving a monthly subscription in my face. 

Elite Training is a place where you will find the best workout and lifting plans out there. In addition, unlike those other apps that require expensive monthly subscriptions, we are 100% free and transparent.


## Data Model


The application will store Users and Workout plans

* users can have multiple workout plans 
* each list can have multiple workout plans


An Example User:

```javascript
{
  username: "",
  email: "",
  hash: "",

}
```

An Example List with Embedded Items:

```javascript
{
 userID: " ",
 category: "",
 title: "",
 difficulty: "",
 content: "",
 

}
```


## Wireframes



/homepage - page for login or signup.
![homepage](documentation/homepage.png)
<br />

/signup - page for signup.
![signup](documentation/signup.png)
<br />

/login - page for login.
![login](documentation/login.png)
<br />

/workoutplans - page for selecting the type of workout plans.
![workoutplans](documentation/workoutplans.png)
<br />

/lifting - page for choosing what body area to target.
![lifting](documentation/lifting.png)
<br />

/cardio - page for choosing were they want to do the cardio.
![cardio](documentation/cardio.png)
<br />

/sampleworkout - sample page of user created workout.
![sampleworkout](documentation/sampleworkout.png)

## Site map
Arrows might be invisibe if using dark mode on github. Switch to light mode to see arrows. 
![sitemap](documentation/sitemap.png)



## User Stories or Use Cases



1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can choose between either cardio or lifting
4. as a user, I can choose where I am doing the cardio
5. as a user, I can view other peoples posted workouts
6. as a user, I can choose the body area the lifting is targeting

## Research Topics


* (4 points) I am going to use client-side JavaScript library React
    * I'm going to be using React for the client-side. It is not the most challenging library, but it also isn't easy.
* (2 points) Use Tailwind CSS framework.
    * I will be Tailwind CSS frameworks in my app.
* (2 points) Incorperate weather API on the cardio page
    * I will be adding a weather API to the cardio page so users can decide what is the best choice

8 out of the 8 required points


## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

