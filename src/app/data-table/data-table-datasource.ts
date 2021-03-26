import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  name: string;
  id: number;
  faculty:string;
  address:string;
  phone:string;
  email:string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {id: 1, name: 'Bane', faculty:'I.T', address: '46 Berkeley Road', phone:'077 3458 0460', email:'MyBoundless@gmail.com'},
  {id: 2, name: 'Todd', faculty:'Business', address: '9 Jubilee Drive', phone:'079 8109 9975', email:'SuperWiggly@gmail.com'},
  {id: 3, name: 'Sarah', faculty:'Social', address: '63 Prince Consort Road', phone:'070 5691 5449', email:'sarahs@gmail.com'},
  {id: 4, name: 'Camron', faculty:'I.T', address: '77 Traill Street', phone:'079 7939 2759', email:'shrapnull@comcast.net'},
  {id: 5, name: 'Stewart', faculty:'Science', address: '10 Walden Road', phone:'070 5940 2054', email:'pplinux@gmail.com'},
  {id: 6, name: 'James', faculty:'Architect', address: '86 Telford Street', phone:'078 5271 1537', email:'rattenbt@gmail.com'},
  {id: 7, name: 'Celia', faculty:'Business', address: '79 St Denys Road', phone:'077 1054 7468', email:'falcao@outlook.com'},
  {id: 8, name: 'Macey', faculty:'Social', address: '36 Park Row', phone:'078 8789 0149', email:'srour@gmail.com'},
  {id: 9, name: 'Robert', faculty:'I.T', address: '54 Holburn Lane', phone:'077 7595 9519', email:'MyDaily@gmail.com'},
  {id: 10, name: 'Amy', faculty:'Science', address: '94 Stroud Road', phone:'070 7239 9339', email:'alhajj@comcast.net'},
  {id: 11, name: 'Luca', faculty:'Music & Art', address: '31 Great North Road', phone:'079 5297 5671', email:'nogin@gmail.com'},
  {id: 12, name: 'Ted', faculty:'Architect', address: '19 Hendford Hill', phone:'078 8842 6994', email:'peterhoeg@outlook.com'},
  {id: 13, name: 'Matilda', faculty:'Business', address: '26 Ash Lane', phone:'077 4547 1268', email:'mschilli@gmail.com'},
  {id: 14, name: 'Sean', faculty:'Architect', address: '89 Graham Road', phone:'070 7695 6676', email:'SuperJagged@gmail.com'},
  {id: 15, name: 'Ryan', faculty:'I.T', address: '1 St Dunstans Street', phone:'077 5885 2557', email:'cosimo@comcast.net'},
  {id: 16, name: 'Dean', faculty:'Music & Art', address: '72 Oxford Road', phone:'070 2055 4798', email:'terjesa@gmail.com'},
  {id: 17, name: 'Aysha', faculty:'Music & Art', address: '34 Greyfriars Road', phone:'078 0427 3014', email:'eminence@gmail.com'},
  {id: 18, name: 'Winston', faculty:'Business', address: '50 Seafield Place', phone:'077 5464 4178', email:'laird@comcast.net'},
  {id: 19, name: 'Jason', faculty:'Science', address: '88 Golden Knowes Road', phone:'078 0726 4522', email:'sdawson@gmail.com'},
  {id: 20, name: 'Lynsey', faculty:'Social', address: '67 Northgate Street', phone:'070 0901 0237', email:'pfitza@outlook.com'},
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: string;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
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
  private getPagedData(data: DataTableItem[]): DataTableItem[] {
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
  private getSortedData(data: DataTableItem[]): DataTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
