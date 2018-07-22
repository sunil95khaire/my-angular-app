import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  errorMessage: string;

  constructor(private service: EmployeeService, private router:Router) { }

  ngOnInit() {
    
  }

  saveEmployee(eForm: NgForm): void {
    var emp = Object.assign({}, this.employee);
    this.service.saveEmployee(emp).subscribe(emp => {
      this.router.navigate(['/list']);
    },
      error => this.errorMessage = <any>error);
    eForm.reset();    
  }
}
