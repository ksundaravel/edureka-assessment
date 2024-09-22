import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../../directives/highlight.directive';
import { IEmployeeAPIResponse, IEmployeeList } from '../../models/iemployee-list';
import { EmployeeListService } from '../../services/employee-list.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,FormsModule,HighlightDirective],
  providers: [EmployeeListService],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  msg: string= '';
  errorMsg: string = '';
  employeeList$!: Observable<IEmployeeAPIResponse>;
  employeeList:IEmployeeList[] = []

  constructor(private employeeService: EmployeeListService){}
  ngOnInit(){
    this.employeeList$ =  this.employeeService.getAllEmployee();
    this.employeeList$.subscribe((res)=> {
      if(res.status==="success"){
        this.errorMsg= '';
        this.msg = res.message;
        this.employeeList = res.data;
      }else{
        this.msg='';
        this.errorMsg = "No success message received from API";
      }
    },
    (error) => {
      this.msg='';
      console.error('error caught in component')
      this.errorMsg = error;
    })
  }
}
