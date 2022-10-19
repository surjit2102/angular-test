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
  isEditMode: boolean= false;
  missionID: any;
  type: any;
  userId: any;

  constructor( private route: ActivatedRoute, private fb: FormBuilder, private auth: AuthService, 
    private router: Router) {   
      
        this.type = this.route.snapshot.paramMap.get('type');
        if (this.type == 'edit') {
          this.userId = this.route.snapshot.paramMap.get('id');
          this.getEmployees();
        }   
        // this.seeker = this.route.snapshot.paramMap.get('type');
        // if (this.seeker == 'edit' || this.seeker == 'view') {
        //   this.userId = this.route.snapshot.paramMap.get('_id');
        //   this.getEmployees();
        // }
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
    this.auth.getRequest('get', this.userId).subscribe((res: any) => {
      this.addEmployees.patchValue(res.data);
      if (this.type == 'view') {
        this.addEmployees.disable();
      }
    });
  }

  

  

  // getEmployees() {
  //   this.auth.getRequestWithID('get/', this.missionID).subscribe((res: any) => {
     
  //       this.addEmployees.patchValue(res.data);
  //       // this.dataSource = res.data.permission;
      
  //   });
  // }

    onSubmit() {
      // this.submitted = true;
      if (this.addEmployees.valid) {
        if (this.type== "Edit") {
          delete this.addEmployees.value.name;
          this.auth
            .putWithID(
              'update',
              this.missionID, 
              this.addEmployees.value
              )
            .subscribe((res: any) => {
                this.router.navigateByUrl('/edit'),
                this.addEmployees.patchValue(res.allEmployees)  
              }
            );
        } else {
          this.auth
            .postRequestwithoutToken('create', this.addEmployees.value)
            .subscribe((res: any) => {
              // if (res.statusCode === 200) {
                this.router.navigateByUrl('/list')
                // history.back();
              }
            );
        } 
      } 
      }

   
}
    
  

      
      
    
  
  


