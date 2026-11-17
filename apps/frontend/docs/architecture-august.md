### useTeamsheets

#### Question 1: What does this hook do?
- keeps track of warning messages using useState
- calles racerService to try to make a new teamsheet
- should validation fail, displays a warning message 
- coordinates overall teamsheet creeation process
- if it succeeds it passes the new teamsheet to App.tsx with a callback
- also has a functions to request deletion 

#### Question 2: Why did you put this logic in the hook?
- this hook manages what happens after a user interaces with the interface
- it handles the warning state the UI needs
- it uses, but does not handle validation
- it doesent own the shared teamsheets array. App.tsx does
- handles the second to last stage of the process, and puts it all together

#### Question 3: Where is it used?
- the main racers.tsx uses this hook for teamsheet creation
- it recives addTeamsheet and deleteTeamsheet callbacks
- it calls the service whenever the user submits a teamsheet
- the shared state is updated in App.tsx

### racerService

#### Question 1: What does this service do?
- this checks the rules that teamsheet creation must follow
- the team name must be three characters long after trim
- user must pick at least one racer
- the betting total must be greater than 0$

#### Question 2: Why did you put this logic in the service?
- validation rules should be covered in service rather than ccattered acrros other ui elements
- putting the logic here avoids validation duplication
- this service decides whether or not a service is valid
- makes later changes a lot easer when making new validation rules

#### Question 3: Where is it used?
- useTeamsheets imports racerService
- hooks calls racerService.createTeamsheet()
- this ervice validates the user input directly
- if it passes racerRepo.createTeamsheet() is called
- the result gets sent back to the hooks

### racerRepo

#### Question 1: What does this repository do?
- it handles the main method createTeamsheet()
- takes teamsheet ID, selected racers, betting total, and builds an object using the Teamsheet type
- handles the final step of actually making 

#### Question 2: Why did you put this logic in the repository?
- this constructs the validates and correct teamsheet
- it doesent need to do validation, thats already happened
- doesnt need to use the warnings, has also already happened
- after teamsheet is made, it goes back to the hooks and then App.tsx

#### Question 3: Where is it used?
- racerservice imports repository
- service calls racerRepo.createTeamsheet() after it passes validation
- repo returns newly constructed object
- after creation it returns to the hook
- both racers and betting pages recive shared teamsheets through props