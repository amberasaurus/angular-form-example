1. Remove environments
2. Forms only persist changes on save, not real-time
3. Validators are shown in the forms on the right side immediately
4. Proceed with no types

new form:

{
zones: [
{
name: ''
},
{
name:''
}
]
}

New thing to add/edit:

FormGroup: {
name: '',
validator: nameValidator
}

constructor(formService)

nameValidator(
{this.formService.getCurrentZones

    see if name in current zone,
    return error

}
)

Basic Form elements - done
FormGroup with sub-form elements
Dynamic FormArrays
add - done
remove
change the order
FormGroup display that depends on a different FormControl being selected, etc. - done
Form split across tabs within the application
Validation across tabs within the application
Validations on control in one tab affect validation of control in a different tab
Pre-populating form
Custom validators
Zones that have different validations based on some criteria

zone: {
id: '',
name: ''
animals: [{
id: ''
}]
}
