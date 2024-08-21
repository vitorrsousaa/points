# Grypp

## 🎲 Running application

```bash
# Clone this repository
$ git clone

# Install the dependencies
yarn install

# Run all applications
yarn dev
```

### Environment variables

After that, add a `.env` file to the root folder, according to the `env.example` of this repository.

For publish lambda functions, is necessary to set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in your `.env` file.

These two keys can be obtained in your personal account.

## Deployment

We can deploy in two stages.

```bash
# Deploy stage dev
$ yarn deploy:dev

# Deploy stage prod
$ yarn deploy:prod
```

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-east-1)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoint: GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
functions:
  hello: aws-node-http-api-project-dev-hello (1.9 kB)
```

After to create routes, test routes, and implements solution, you can remove all resources that was deployed by using:

```bash
serverless remove
```

## dynamo table

This document outlines the table design for a DynamoDB single-table pattern based on the requirements provided. The design supports the access patterns necessary for managing coaches, athletes, workouts, exercises, and exercise history.

## Table Design: Primary Key and Sort Key Structure

| **Entity**           | **Primary Key (PK)**           | **Sort Key (SK)**                      | **Additional Notes**                               |
|----------------------|--------------------------------|----------------------------------------|----------------------------------------------------|
| **User**             | `USER#<userId>`                | `PROFILE`                              | Stores basic profile info for the user.           |
| **Settings**         | `USER#<userId>`                | `SETTINGS`                             | Stores basic settings info for the user.           |
| **Coach**            | `USER#COACH#<coachId>`         | `COACH#PROFILE`                        | Stores basic profile info for the coach.           |
| **Athlete**          | `USER#COACH#<coachId>`         | `ATHLETE#<athleteId>`                  | All athletes under a coach, query by coach ID.     |
| **Default Exercise** | `EXERCISE#DEFAULT`             | `EXERCISE#<exerciseId>`                | Predefined exercises available to all coaches.     |
| **Custom Exercise**  | `EXERCISE#COACH#<coachId>`     | `EXERCISE#<exerciseId>`                | Custom exercises created by a specific coach.      |
| **Exercise History** | `HISTORY#ATHLETE#<athleteId>`  | `EXERCISE#<exerciseId>#DATE#<date>`    | Track exercise performance over time per athlete.  |
| **Workout**          | `WORKOUT#ATHLETE#<athleteId>`  | `WORKOUT#<date>`                       | Store workouts by athlete ID, sorted by date.      |
| **Workout Result**   | `RESULT`   | `STATUS#PENDING#ATHLETE#<athleteId>#DATE<date>`       | Track exercise performance over time per athlete.  |
| **Workout Feedback** | `FEEDBACK#ATHLETE#<athleteId>` | `WORKOUT#<workoutId>#DATE<date>`       | Track exercise performance over time per athlete.  |


## Access Patterns and Queries

### 1. Retrieve All Athletes for a Coach
- **Query:** 
  ```sql
  PK = USER#COACH#<coachId> AND begins_with(SK, 'ATHLETE#')

### 2. Fetch All Exercises (Default + Custom)
Query 1 (Default Exercises):
```sql
sql
PK = EXERCISE#DEFAULT
```
Query 2 (Custom Exercises):
```sql
PK = EXERCISE#COACH#<coachId>
``` 
Explanation: These queries fetch both the default exercises and custom exercises created by the coach.

### 3. Retrieve All Workouts for a Specific Athlete
Query:
```sql
PK = WORKOUT#ATHLETE#<athleteId>
```

### 4. Track Workout Details and Updates
Storage: Use a WORKOUT entity with the workout details and allow athletes to update them.
Explanation: Athletes can update the workout items directly, storing the actual performance details.

### 5. Track Exercise History for an Athlete
Query:
```sql
PK = HISTORY#ATHLETE#<athleteId> AND begins_with(SK, 'EXERCISE#<exerciseId>#DATE#')
```
Explanation: Returns the performance history of a specific exercise for the athlete, sorted by date.

### 6. Athlete starts a workout ang log perfomance
Query:
```sql
PK = RESULT#ATHLETE#<athleteId> AND SK = WORKOUT#<workoutId>
```

### 7. Coach reviews the workout
Query:
```sql
PK = RESULT AND begins_with(SK, 'STATUS#PENDING') AND GSI(coach_id)
```
Explanation: Query to get Workout result with status pending by coach_id
Explanation: When the coach send feedback, we will delete result and create other with 'STATUS#DONE'

### 8. Coach send feedback for athlete
Query:
```sql
PK = FEEDBACK#ATHLETE#<athleteId> AND SK = WORKOUT#<workoutId>#DATE<date>
```
Explanation: Query to create Workout feedback for specific athlete

### 8. List all feedbacks for athlete
Query:
```sql
PK = FEEDBACK#ATHLETE#<athleteId>
```