# Honesto - Frontend Practical Exercise

Honesto is an application allowing peers to leave feedback for other team members.  For this exercise, you are to 
implement the required tasks below, along with any bonus tasks you also have time to complete.

Designs for all tasks are [available in Figma](https://www.figma.com/file/nwVmrFXBDTay1vHA7pZHR1/Practical---FE-Exercise---Honesto-1.1), please follow these designs for all tasks.

Each task needs to be its own PR, with a thorough description and no unrelated changes, merged to main (no reviews are required). Git usage is very important. For this exercise, we won't enforce any style, but we want to get a clear overview of your work just by looking at your commit history.

The application has a few small changes from Figma to help in development of the following tasks: 
* The login page allows you to quickly login as a different user to see the data from the perspective of that user.
* The time period for giving reviews is intentionally absent from the application, so for this exercise treat the feedback as a one time event rather than per time period.  There is an optional task to extend this functionality to monthly reports.

## Task 1: Gather Feedback

A user can provide feedback on other team members (_"Share Feedback" in Figma_).  For a selected team member, they will answer a series of questions. 

- The questions to ask are already stored in the React context. Keep in mind that some are _skippable_.
- Create the user interface needed to ask and collect answers for each question for a selected team member.
- Update the app to save the results of the feedback.  _The saved results do not need to persist through a page refresh but the app should allow full navigation without data loss._
- Your data model should support feedback from/to various users.

## Task 2: Display Feedback Given

After having given feedback, a user can review all the feedback they have given to other team members (_"My Feedback" in Figma_).

- Display all feedback given by the current user.  
- Include the case of when no feedback has been given.

## Task 3: Display Received Feedback 

Besides giving feedback, a user can also see feedback received from their team (_This does not exist in Figma other than the navigation item "Team Feedback", but you can model it after the layout of the previous task._).

- Display the feedback received by the current user from other team members.
- Include the case of when no feedback has been received.

## Bonus Tasks (optional)

Feel free to also implement any the following task if you are just getting warmed up:

- [ ] Add Accessibility (A11y) testing and update components to comply
- [ ] Create a dark theme for the project
- [ ] Make the logged user widget, displayed in the upper-right corner the same as in designs
- [ ] Make the app more responsive on various devices
- [ ] Update the app to have multiple feedback collections (per month) for each user
- [ ] Write some tests (jest, cypress, react testing library, etc)
- [ ] Add documentation about your tasks to help other developers understand decisions you made



## Task solutions
### Task 1: Gather Feedback
- I created a new view called GiveUserFeedback which contains the content of the questions. And for this component, I created a component called Question to handle all the different types of questions. 
- To keep the user on the same navigator tab, I changed the share-feedback navigation property “exact” to false.
- I’m also handling not-found requests inside the `/share-feedback/*` URL. 
- When the user submits the feedback, it dispatches a reducer on the new FeedbackContext which handles the feedback data. Feedback structure: `{ from: UserT, to: UserT, questionAnswers: QuestionAnswerT[]}`. and then it takes the user to the `/share-feedback/thank-you` page. 
- When the user comes back to the share-feedback page he can see his submissions saved on the FeedbackContext  in the `/share-feedback/submissions/:UserId` page

### Task 2: Display Feedback Given
- To display the comments provided I redid the review comments page and rewrite it as the comments page because it makes more sense to me
- I reused the same component on the `/share-feedback/submissions/:UserId` to show the user answers, retrieving the user feedback from the FeedbackContext and adding some behaviors as select user feedback, hover, and so on.
- I’m also handling cases where there’s no feedback given.

### Task 3: Display Received Feedback 
- I reused the MyFeedback view to make the TeamFeedback view, but instead of showing feedback from the user, I’m showing the feedback to the user. 
- As the task was very simple, I added a new behavior to read received feedback, so I use the Figma design to show “new” feedback on the TeamFeedback page, and I’m also showing the number of unread feedbacks on the Navigation Tab.
