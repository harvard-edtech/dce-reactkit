Also, every Field component must have a property called `name`.

Each field must call its own `props.onChange(answer, haltSubmit)` function when its value is changed

- haltSubmit = true if the submit button should be disabled (this field is not valid)

Upon creation, send an onChange update!
