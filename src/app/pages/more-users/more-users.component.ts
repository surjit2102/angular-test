import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-more-users',
  templateUrl: './more-users.component.html',
  styleUrls: ['./more-users.component.scss']
})
export class MoreUsersComponent implements OnInit {
  // submitted: boolean= false;    
  // moreEmployees: FormGroup;
  // isEditMode: boolean= false;
  // missionID: any;
  // type: any;
  // userId: any;
  // getEmployees: any;
  title = 'formArray';  
  moreEmployees!: FormGroup;  
  // items!: FormArray;

  constructor( private route: ActivatedRoute, private formBuilder: FormBuilder, private auth: AuthService, 
    private router: Router) {          
    // this.moreEmployees= this.fb.group({
    //   id: ['', [Validators.minLength(6),Validators.required]],
    //   employee_name: ['', [Validators.minLength(6),Validators.required]],
    //   employee_age: ['', [Validators.minLength(2),Validators.required]],
    //   employee_salary: ['', [Validators.minLength(6),Validators.required]],
    // })
   

    this.moreEmployees = this.formBuilder.group({
      items: this.formBuilder.array([]) ,
    });

  }   
  ngOnInit(): void {
    
  }
  get items() : FormArray {
    return this.moreEmployees.get("items") as FormArray
  }

  newItem(): FormGroup {
    return this.formBuilder.group({
      id: '',
      employee_name: '',
      employee_age: '',
      employee_salary: '',
    })
 }
 addItem() {
  this.items.push(this.newItem());
}
removeSkill(i:number) {
  this.items.removeAt(i);
}  
    onSubmit(){
      if (this.moreEmployees.valid) {
        console.table(this.moreEmployees.value["items"]);      
      }
}   
}