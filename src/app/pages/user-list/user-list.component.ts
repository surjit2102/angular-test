import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

export interface Element {
  id: string;
  employee_name: number;
  employee_age: number;
  employee_salary: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns = ['id', 'employee_name', 'employee_salary', 'employee_age', 'action'];
  dataSource = new MatTableDataSource<Element>();
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @Output() searchOutput: EventEmitter<any> = new EventEmitter();

  userId: any;
  missionDetails: any;
  search: string = '';
  currentPage: number = 1;
  recordsLength: number = 1;
  pageSize = 10;
  pageIndex= 0;
  limit= 10;


  constructor(private route: ActivatedRoute, private auth: AuthService,
    private httpClient: HttpClient,private router :Router) { 
    
   
  }

  ngOnInit(): void {
    this.getUsers();
    this.missionDetails = this.route.snapshot.paramMap.get('type');
    if (this.missionDetails == 'edit') {
      this.userId = this.route.snapshot.paramMap.get('_id');
    }
    
  //   this.dataSource.filterPredicate = function(data, filter: string): boolean {
  //     return data.id.toLowerCase().includes(filter) || data.employee_name.toString().includes(filter) || data.employee_age.toString().includes(filter);
  // }
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
  handlePage(event: PageEvent) {
    console.log(event, 'paginator');
    let body: any = {
      pageSize: event.pageSize,
      currentPage: event.pageIndex+1,
    };

  }

  add(){
    this.router.navigateByUrl('/add')
  }

  getUsers() {
    let query = `page=${this.currentPage}&limit=${this.pageSize}`;
    this.search &&
      (query = `page=${this.currentPage}&size=${this.pageSize}&search=${this.search}`);

    // this.auth.getRequestWithoutbody('getAll',{
    //   search: this.search
    // }).subscribe((res: any) => {
    //   this.dataSource = res.data;
    //   this.recordsLength = res.data.count;

    // });
    this.auth.getRequest('getAll', query).subscribe((res: any) => {
        this.dataSource = res.allEmployees;
        this.recordsLength = res.count;
  
      });
  }


  ngAfterViewInit() {

  }

  // Search() {
  //   this.pageIndex=0;
  //   this.getUsers();
  // }


  removeItem(_id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.auth.deleteRequest('delete',_id).subscribe((res: any) => {
          let data = {
            search: null,
          };
          Swal.fire('Deleted!', 'User has been deleted.', 'success');
          this.getUsers();
        });
      }
    });
  }
 
}









