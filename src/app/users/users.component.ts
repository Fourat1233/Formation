import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ApiService } from '../Service/api.service';



// export interface UsersData {
//   id: number;

// 	   login: String;
// 	   pwd: String	;

// }
const ELEMENT_DATA: any[] = [
  
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'login','pwd','action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;


  constructor(public dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.apiGetAll('/user/allUsers').subscribe( (users: any) => {
      if (users) {
        this.dataSource.push(...users);
        this.table.renderRows();
      }
    },
    (error) => {
      console.log(error);
    });

  }

  openDialog(action: any,obj:  any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any){
    var d = new Date();
    this.apiService.apiPost('/user/addUser',{
      login:row_obj.login,
      pwd:row_obj.pwd
    }).subscribe( (response: any) =>{
      this.dataSource.push({
        id:response.id,
        login:response.login,
        pwd:response.pwd,
  
  
      });
      this.table.renderRows();
    })

    
  }
  updateRowData(row_obj: any){
    this.dataSource = this.dataSource.filter((value: any,key: any)=>{
      if(value.id == row_obj.id){
        value.login=row_obj.login;
        value.pwd=row_obj.pwd;

      }
      this.apiService.apiPut('/user/updateUser',{
        id : row_obj.id,
        login:row_obj.login,
        pwd:row_obj.pwd
      }).subscribe( (response: any) =>{
        this.table.renderRows();
      })
  
      return true;
    });
  }
  deleteRowData(row_obj: { id: any; }){


    this.dataSource = this.dataSource.filter((value: any,key: any)=>{
      return value.id != row_obj.id;
    });
    this.apiService.apiDelete(`/user/deleteUser/${row_obj.id}`).subscribe( (response: any) =>{
        console.log(response);
    })

  }

}
