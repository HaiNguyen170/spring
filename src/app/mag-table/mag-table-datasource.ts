import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface MagTableItem {
  title: string;
  id: number;
  user: string;
  status: string;
  created_date:string;
  expired_date:string;
  file:string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: MagTableItem[] = [
  {id: 1, title: 'Hydrogen', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 2, title: 'Helium', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 3, title: 'Lithium', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 4, title: 'Beryllium', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 5, title: 'Boron', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 6, title: 'Carbon', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 7, title: 'Nitrogen', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 8, title: 'Oxygen', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 9, title: 'Fluorine', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 10, title: 'Neon', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 11, title: 'Sodium', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 12, title: 'Magnesium', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 13, title: 'Aluminum', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 14, title: 'Silicon', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 15, title: 'Phosphorus', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 16, title: 'Sulfur', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 17, title: 'Chlorine', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 18, title: 'Argon', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 19, title: 'Potassium', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
  {id: 20, title: 'Calcium', user: 'a', status:'done', created_date:'1/1/2000', expired_date:'2/1/2000', file:'b'},
];

/**
 * Data source for the MagTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MagTableDataSource extends DataSource<MagTableItem> {
  data: MagTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MagTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MagTableItem[]): MagTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MagTableItem[]): MagTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'user': return compare(+a.id, +b.id, isAsc);
        case 'created_date': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/title columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
