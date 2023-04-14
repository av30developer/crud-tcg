import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { EmployeeserviceService } from '../employeeservice.service';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild(AppComponent,{static:true}) child: AppComponent;
  employeedata:FormGroup;
  empdata:any;
  response:any;
  employeeList:any;
  searchText:any;
  userDetails:any;
  userId:any;
  
  constructor(public employeeservice:EmployeeserviceService,private toastr: ToastrService) { 
    this.employeedata = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required])
    })
  }
  get f(){
    return this.employeedata.controls;
  }

  onSubmit(){
    this.empdata=this.employeedata.value   
    if(this.employeedata.invalid){
      Object.keys(this.employeedata.controls).forEach(element => {
        const keysdata=this.employeedata.get(element);
        keysdata.markAsDirty({onlySelf:true});
      });
    }
    console.log("item",this.employeedata.value);
    this.employeeservice.postApi("add-user",this.employeedata.value).subscribe((res)=>{
    if(res.status===200){
      this.toastr.success("User Added Successfully")
    }
    })
    this.employeedata.reset();
    location.reload();  
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.employeeservice.getApi("get-user").subscribe((res)=>{
      this.employeeList=res;
     })
  }

  editData(obj){
    this.userId=obj.id;
    this.employeedata.patchValue({
      id:obj.id,

      firstName:obj.firstName,

      lastName:obj.lastName,

      email:obj.email

    });
    $("#updateUser").show();
    
  }

  deleteUser(id){
    console.log("id",id)
    this.employeeservice.deleteApi("delete-user",id).subscribe((res)=>{
      this.employeeList=res;
     })
     this.toastr.success("User Deleted Successfully")
     this.ngOnInit();
  }
  hideModal(){
    $("#updateUser").hide();
  }
  updateUserData(id){
  this.employeeservice.putApi("update-user",this.employeedata.value,id).subscribe((res)=>{
        this.toastr.success("User Updated Successfully");
    });
    location.reload();  
  }
}
