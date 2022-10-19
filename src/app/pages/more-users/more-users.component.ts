import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

interface Missions {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-more-users',
  templateUrl: './more-users.component.html',
  styleUrls: ['./more-users.component.scss']
})
export class MoreUsersComponent implements OnInit {
  submitted: boolean= false;  
  
  moreEmployees: FormGroup;
  isEditMode: boolean= false;
  missionID: any;
  type: any;
  userId: any;
  getEmployees: any;

  constructor( private route: ActivatedRoute, private fb: FormBuilder, private auth: AuthService, 
    private router: Router) {   
      
        // this.type = this.route.snapshot.paramMap.get('type');
        // if (this.type == 'edit') {
        //   this.userId = this.route.snapshot.paramMap.get('_id');
        //   this.getEmployees();
        // }   
    this.moreEmployees= this.fb.group({
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


  

  

  // getEmployees() {
  //   this.auth.getRequestWithID('get/', this.missionID).subscribe((res: any) => {
     
  //       this.addEmployees.patchValue(res.data);
  //       // this.dataSource = res.data.permission;
      
  //   });
  // }

    // onSubmit() {
    //   // this.submitted = true;
    //   if (this.addEmployees.valid) {
    //     if (this.type) {
    //       delete this.addEmployees.value.name;
    //       this.auth
    //         .putRequest(
    //           'update',
    //           this.missionID, 
    //             // this.addEmployees.value
    //           )
    //         .subscribe((res: any) => {
    //             this.router.navigateByUrl('/add'),
    //             this.addEmployees.patchValue(res.data)  
    //           }
    //         );
    //     } else {
    //       this.auth
    //         .postRequestwithoutToken('create', this.addEmployees.value)
    //         .subscribe((res: any) => {
    //           // if (res.statusCode === 200) {
    //             this.router.navigateByUrl('/list')
    //             // history.back();
    //           }
    //         );
    //     } 
    //   } 
    //   }

    onSubmit(){
      if (this.moreEmployees.valid) {
        console.log(this.moreEmployees.value);
        
        
      }
    }

   
}
    
  

      
      
    
  
  


