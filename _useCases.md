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
