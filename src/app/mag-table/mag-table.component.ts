import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MagTableDataSource, MagTableItem } from './mag-table-datasource';

@Component({
  selector: 'app-mag-table',
  templateUrl: './mag-table.component.html',
  styleUrls: ['./mag-table.component.css']
})
export class MagTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MagTableItem>;
  dataSource: MagTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title','student', 'status', 'created_date', 'expired_date', 'file', 'review'];

  constructor() {
    this.dataSource = new MagTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
}
