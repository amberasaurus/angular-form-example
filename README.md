# FormsExample

Show the running application before looking at code so students understand it.

Start with form.service.ts
Next, show data loading in form-loader.service.ts


Things to point out:
- Routing
- Failed validator bubbles up to the top
- Add and Edit are handled by the same form


Validations which prevent saving:
- Enclosure max cap. cannot be lower than current number of animals
- Can't add an animal to a full enclosure

Validations which are temporarily allowed:
- Some animals eat others. See form-validator-service.ts for rules
