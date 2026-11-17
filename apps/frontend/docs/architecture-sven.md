# Race Feature Architecture


## useFormInput
src/hooks/useFormInput.tsx

### 1. What does it do?
This hook manages a string input value and a validation message.

### 2. What logic is inside?
Input state and validation-message state are reusable. Keeping them in
a hook avoids repeating state declarations in every form.

### 3. Where is the implementation?
used in RaceFrom.tsx for the race name, location, track image path, date, and track length.
The component reads each field's value and calls setValue when the user changes an
input or selects a location.


## raceFormService
src/services/raceFormServices.ts

### 1. What does it do?
The service validates race input before creation. It checks
required fields, a valid date, a trimmed race name between 3 and 30 characters, and a finite
track length between 1 and 15 km with at most one decimal place. Validation messages are combined
into an error before the repository is called. It also retrieves races, throws when a requested 
race is missing, and checks that a deletion has a nonempty ID matching an existing race.

### 2. What logic is inside?
Validation/business rules.

addRace:
- Filled input fields.
- Text field must have more than 3 characters.
- Text field cannot have more than 30 characters.
- Track length can only be between 1 and 15 km.
- Track length can only have decimal place.
- Combine all error messages to display them all.

deleteRace:
- Race ID is required.
- Validate if race was deleted.

getRaces
- await from racesRepo.getAllRaces (no validation)

getRace
- await from racesRepo.getRace with selectedId[the raceId] and throw if undefined is returned.

### 3. Where is the implementation?
Used in:

- RaceForm.tsx: calls addRace to validate and create a race before updating page state.
- Races.tsx: calls getRaces inside its useEffect to populate local race state.
- DeleteRace.tsx: Calls deleteRace and removes the race from page. It displays any caught error message.


## racesRepo
src/repositories/racesRepo.ts

### 1. What does it do?
It accesses races mock data and allows for retrival, creation, or deletion.

### 2. What logic is inside?
CRUD opertions for getAllRaces, getRace, createRace, and deleteRace.

### 3. Where is the implementation?
Used in raceServiceForm.ts. The service uses getAllRaces to list races, getRace
to retrieve a race, createRace after validation, and deleteRace after deletion checks pass.


## useFormSubmit
src/hooks/useFormSubmission.ts

### 1. What does it do?
Runs a forms submission function, clears old errors, and stores new error messages for display.

### 2. What logic is inside?
Included clearing old errors, running the submit function, and saving any new errors because different forms need these steps.

### 3. Where is the implementation?
RaceForm.tsx uses it to run the function that adds a race through raceFormService and updates the race list. The form displays any returned error messages.