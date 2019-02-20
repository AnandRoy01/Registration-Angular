import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Shared/employee.service';
import { Employee } from 'src/app/Shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
list:Employee[];
  constructor( private service:EmployeeService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray =>{
      this.list = actionArray.map(item =>{
        return {
          id : item.payload.doc.id,
          ...item.payload.doc.data() } as Employee;
      })
    });
  }
  onEdit(emp:Employee){
    this.service.formData = Object.assign(emp);
  }
  onDelete(id:string){
    if(confirm("Are You sure to delete this record")){
      this.firestore.doc('employee/'+id).delete();
      this.toastr.warning('Deleted Successfully', 'EMP. Register');
    }
  }
}
