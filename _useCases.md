1. Basic Form elements - done
2. FormGroup with sub-form elements
3. Dynamic FormArrays
   1. add - done
   2. remove
   3. change the order
4. FormGroup display that depends on a different FormControl being selected, etc. - done
5. Form split across tabs within the application
   1. Validation across tabs within the application
      1. Validations on control in one tab affect validation of control in a different tab
6. Pre-populating form
7. Custom validators



Zoo:
   Environment: Tabs[Desert, Jungle, Forest, Ocean] -> Zones[] -> Animals[]
   Zones: [] of Animals, have a maximum # of animals
   Animal: {
      name:
      type: herbivore, carnivore
      emoji,
      life stage: adult, juvenile,
      if carnivore, what animals does it eat?
   }
You can't have herbivore and carnivores in the same zone
Babys can be together despite type. Adults cannot (depending on types of animal it eats).

{
   environments: form array of zones
}

{
   zone: form group {
      animals[] form array,
      maxCapacity: form control
   }
}

{
   species: form group {
      name: form control,
      emoji: form control,
      prey: form array of Species[]
      type: herb/carn
   }
}

{
   animals: form group {
      name: form control
      species: form control
      life stage: enum form control,
      future: dislike certain prey?
   }
}
