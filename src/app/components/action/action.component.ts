import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MasterService } from 'src/app/services/master.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { read, utils, writeFile } from 'xlsx';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css'],
})
export class ActionComponent implements OnInit {
  dataList: any[] = [];
  

  constructor(
    private service: MasterService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  // handleImport(e: any) {
  //   console.log(e);
  //   const files = e.target.files;
  //   if(files.length){
  //     const file = files[0];
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       const wb = read(event.target.result);
  //       console.log(wb);
  //       const sheets = wb.SheetNames;

  //       if(sheets.length){
  //         const rows = utils.sheet_to_json(wb.Sheets[sheets[1]]);
  //         console.log(rows);
  //         this.foodItem = rows;
  //       }
  //     }
  //     reader.readAsArrayBuffer(file);
  //   }
  // }

  handleExport() {
    var headings: any = [[]];
    var noDataflag: boolean;

    if (this.dataList.length != 0) {
      const data = this.dataList[0];
      for (const key of Object.keys(data)) {
        headings[0].push(key);
      }
    }

    if (this.dataList.length != 0) {
      noDataflag = false;
    } else {
      noDataflag = true;
    }

    if (!noDataflag) {
      const wb = utils.book_new();
      const ws: any = utils.json_to_sheet([]);
      utils.sheet_add_aoa(ws, headings);
      utils.sheet_add_json(ws, this.dataList, {
        origin: 'A2',
        skipHeader: true,
      });
      utils.book_append_sheet(wb, ws, 'Report');
      writeFile(wb, 'Data Report.xlsx');
    }

    const position = 'bottom left';
    const direction = 'down-push';

    const msg = noDataflag == false ? 'File Exported' : 'No data to Export';
    const color = noDataflag == false ? 'success' : 'warning';

    notify(
      {
        message: msg,
        height: 45,
        width: 250,
        minWidth: 150,
        type: color,
        displayTime: 1500,
        animation: {
          show: {
            type: 'fade',
            duration: 400,
            from: 0,
            to: 1,
          },
          hide: {
            type: 'fade',
            duration: 40,
            to: 0,
          },
        },
      },
      { position, direction }
    );
  }

  onValueChanged(e: any) {
    console.log('onValueChanged', e);

    // const files = e.value;
    // if (files.length) {
    //   const file = files[0];
    //   const reader = new FileReader();
    //   reader.onload = (event: any) => {
    //     const wb = read(event.target.result);
    //     console.log(wb);
    //     const sheets = wb.SheetNames;

    //     if (sheets.length) {
    //       let rows = utils.sheet_to_json(wb.Sheets[sheets[1]]);
    //       if (rows.length === 0) {
    //         rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
    //       }

    //       console.log(rows);
    //       this.dataList = rows;
    //     }
    //   };
    //   reader.readAsArrayBuffer(file);
    // }

    let btn = document.getElementsByClassName('dx-button-content')[1];
    if(btn.classList.contains('btn-upload')){
      btn.classList.remove('btn-upload');
    }
    
  }

  onUploadStarted(e: any){
    console.log('onUploaded', e);

    const files = e.file;
    
    if (files) {
      const file = files;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          let rows = utils.sheet_to_json(wb.Sheets[sheets[1]]);
          if (rows.length === 0) {
            rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          }

          console.log('sheet rows', rows);
          this.dataList = rows;
        }
      };
      reader.readAsArrayBuffer(file);
    }

    let btn = document.getElementsByClassName('dx-button-content')[1];
    btn.classList.add('btn-upload');

  }

  onProgress(e: any){
    console.log('onProgress event', e);
  }



}
