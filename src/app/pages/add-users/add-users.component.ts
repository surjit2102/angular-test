import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

interface Missions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  submitted: boolean= false;
  
  addEmployees: FormGroup;
  missionID: any;
  type: any;
  userId: any;

  constructor( private route: ActivatedRoute, private fb: FormBuilder, private auth: AuthService, 
    private router: Router) {   
      this.userId = this.route.snapshot.paramMap.get('id');
      console.log(this.userId);
        
    this.getEmployees();
    this.addEmployees= this.fb.group({
      id: ['', [Validators.minLength(6),Validators.required]],
      employee_name: ['', [Validators.minLength(6),Validators.required]],
      employee_age: ['', [Validators.minLength(2),Validators.required]],
      employee_salary: ['', [Validators.minLength(6),Validators.required]],
      

    })
    
   }

  ngOnInit(): void {
    // if (this.route.snapshot.queryParams['_id']) {
    //   this.isEditMode = true;
    //   this.missionID = this.route.snapshot.queryParams['_id'];
    //   this.getEmployees();
    
    
  
  }  
  getEmployees() {

    this.auth.getRequestWithID('get/', this.userId).subscribe((res: any) => {
      this.addEmployees.patchValue(res.data);
      if (this.type == "view") {
        this.addEmployees.disable();
      }
    });
  }

    onSubmit(){
  
      (this.type =='add'
        ?this.auth.postRequestwithoutToken("create",this.addEmployees.value)
    
        :this.auth.putWithID(`update`,this.userId,this.addEmployees.value)
      ).subscribe((result)=>{ 
        console.log(result);
        this.router.navigateByUrl('/list')
      })
      
      if( this.addEmployees.valid){
        this.addEmployees.enabled
      }
      else{
        this.addEmployees.markAllAsTouched()
      }
    }
   
}
    
  

      
      
    
  
  


