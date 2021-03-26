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
  review:string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: MagTableItem[] = [
  {id: 1, title: 'The Importance of Bio-tech', user: 'John', status:'pending', created_date:'10/3/2021', expired_date:'24/3/2021', file:'b', review:'a'},
  {id: 2, title: 'Travis Scott: New music of our time', user: 'Chase', status:'pending', created_date:'5/3/2021', expired_date:'19/3/2021', file:'b', review:'a'},
  {id: 3, title: 'What is Bitcoin?', user: 'Elise', status:'pending', created_date:'3/3/2021', expired_date:'17/3/2021', file:'b', review:'a'},
  {id: 4, title: 'A Trip to the Moon', user: 'Jay', status:'pending', created_date:'10/3/2021', expired_date:'24/3/2021', file:'b', review:'a'},
  {id: 5, title: 'The Grammy: A Fashion Statement', user: 'Aprxel', status:'pending', created_date:'5/3/2021', expired_date:'19/3/2021', file:'b', review:'a'},
  {id: 6, title: 'Machine learning: A modern future', user: 'Mike', status:'pending', created_date:'10/3/2021', expired_date:'24/3/2021', file:'b', review:'a'},
  {id: 7, title: 'The Industries of Gaming', user: 'Peter', status:'pending', created_date:'10/3/2021', expired_date:'24/3/2021', file:'b', review:'a'},
  {id: 8, title: 'Partners in equality', user: 'Tony', status:'pending', created_date:'3/3/2021', expired_date:'17/3/2021', file:'b', review:'a'},
  {id: 9, title: 'The Truth about Cryptocurrency', user: 'Charlie', status:'pending', created_date:'3/3/2021', expired_date:'17/3/2021', file:'b', review:'a'},
  {id: 10, title: 'The Power of Personality', user: 'May', status:'pending', created_date:'5/3/2021', expired_date:'19/3/2021', file:'b', review:'a'},
  {id: 11, title: 'A World Leader in Converting Technologies', user: 'Ethan', status:'pending', created_date:'10/3/2021', expired_date:'24/3/2021', file:'b', review:'a'},
  {id: 12, title: 'Copyright Infringement', user: 'Harry', status:'pending', created_date:'5/3/2021', expired_date:'19/3/2021', file:'b', review:'a'},
  {id: 13, title: 'Why bat viruses are dangerous', user: 'Simon', status:'pending', created_date:'10/3/2021', expired_date:'24/3/2021', file:'b', review:'a'},
  {id: 14, title: 'On Business Model Innovation', user: 'Felix', status:'pending', created_date:'3/3/2021', expired_date:'17/3/2021', file:'b', review:'a'},
  {id: 15, title: 'Remote Learning Isn’t Just for Kids', user: 'Liz', status:'pending', created_date:'10/3/2021', expired_date:'24/3/2021', file:'b', review:'a'},
  {id: 16, title: 'Face Foward', user: 'Stacy', status:'pending', created_date:'5/3/2021', expired_date:'19/3/2021', file:'b', review:'a'},
  {id: 17, title: 'Architectire on edge', user: 'Ted', status:'pending', created_date:'3/3/2021', expired_date:'17/3/2021', file:'b', review:'a'},
  {id: 18, title: 'A.I Analytics', user: 'Don', status:'pending', created_date:'10/3/2021', expired_date:'24/3/2021', file:'b', review:'a'},
  {id: 19, title: 'How COVID-19 affect the film industry', user: 'Kylie', status:'pending', created_date:'5/3/2021', expired_date:'19/3/2021', file:'b', review:'a'},
  {id: 20, title: 'Science and Culture', user: 'Tobi', status:'pending', created_date:'10/3/2021', expired_date:'24/3/2021', file:'b', review:'a'},
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
