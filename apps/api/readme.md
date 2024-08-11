# DynamoDB Single-Table Design for Powerlifting SaaS

This document outlines the table design for a DynamoDB single-table pattern based on the requirements provided. The design supports the access patterns necessary for managing coaches, athletes, workouts, exercises, and exercise history.

## Table Design: Primary Key and Sort Key Structure

| **Entity**         | **Primary Key (PK)**            | **Sort Key (SK)**                      | **Additional Notes**                                |
|--------------------|---------------------------------|----------------------------------------|----------------------------------------------------|
| **Coach**          | `USER#COACH#<coachId>`          | `COACH#PROFILE`                        | Stores basic profile info for the coach.           |
| **Athlete**        | `USER#COACH#<coachId>`          | `ATHLETE#<athleteId>`                  | All athletes under a coach, query by coach ID.     |
| **Default Exercise** | `EXERCISE#DEFAULT`            | `EXERCISE#<exerciseId>`                | Predefined exercises available to all coaches.     |
| **Custom Exercise**  | `EXERCISE#COACH#<coachId>`    | `EXERCISE#<exerciseId>`                | Custom exercises created by a specific coach.      |
| **Workout**        | `WORKOUT#ATHLETE#<athleteId>`   | `WORKOUT#<date>`                       | Store workouts by athlete ID, sorted by date.      |
| **Exercise History** | `HISTORY#ATHLETE#<athleteId>` | `EXERCISE#<exerciseId>#DATE#<date>`    | Track exercise performance over time per athlete.  |

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