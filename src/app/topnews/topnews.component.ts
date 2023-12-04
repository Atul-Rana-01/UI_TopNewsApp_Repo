import { Component, OnInit, Injectable , ViewChild} from '@angular/core';
import { TopnewsService } from '../topnews/topnews.service'
import { TopNewsModel } from '../models/TopNewsModel';
import { MatTableDataSource} from '@angular/material/table';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topnews',
  templateUrl: './topnews.component.html',
  styleUrls: ['./topnews.component.scss'],
  standalone:true,
  imports:[MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    CommonModule]
})
export class TopnewsComponent {
  constructor(private service: TopnewsService){}
  public TopNewsModel: TopNewsModel[] = [];
  public dataLength:number=0;
  public pageSize:number = 10;
  public currentPage:number = 0;
  public dataSource: any;
  public displayedColumns: string[] = ['title', 'url'];
  public columnsToDisplay: string[] = this.displayedColumns.slice();
  public isLoading : boolean=true;

  ngOnInit() {
    this.GetTopNewsList();
    }
    
    // getting top News data
    GetTopNewsList = () => {
    
      this.TopNewsModel = new Array<TopNewsModel>();
      this.service.GetTopNewsList().subscribe(result => {
        
        this.isLoading = false;  //flag for loader
       
        if (result.length > 0) {
          this.dataLength= result.length;  // getting data length for pagination
          this.TopNewsModel = result;
          this.dataSource = new MatTableDataSource(this.TopNewsModel); // getting data for show in table
          this.iterator();
        }
      
      });
      
    }

    applyFilter(event: Event) {
       const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    }

     doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

// function for getting index of page for moving forward or backward
    public handlePage(e: any) {
      this.currentPage = e.pageIndex;
      this.pageSize = e.pageSize;
      this.iterator();
    }

   //  function for moving page forward or backward
    private iterator() {
      const end = (this.currentPage + 1) * this.pageSize;
      const start = this.currentPage * this.pageSize;
      const part = this.TopNewsModel.slice(start, end);
      this.dataSource = part;
    }

}