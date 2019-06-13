import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserInterface, PaginationInterface } from '../../../../interfaces';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns = ['first_name', 'last_name', 'email'];
  userList: any[] = [];
  pageSize: number;
  pagesCount: number;
  currentPage: number;
  isLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(map(data => data.users))
      .subscribe((users: UserInterface[]) => {
        this.userList = users;
      });

    this.activatedRoute.data.pipe(map(data => data.paginationInfo))
      .subscribe((paginationInfo: PaginationInterface) => {
        this.pagesCount = paginationInfo.total;
        this.currentPage = paginationInfo.page - 1;
        this.pageSize = paginationInfo.per_page;
        this.isLoaded = true;
      }).unsubscribe();
  }

  pageChanged(event: PageEvent): void {
    const page: number = event.pageIndex + 1;
    this.router.navigate(['./'], { queryParams: { page } });
  }

  userSelected(user: UserInterface): void {
    this.router.navigate(['./user', user.id]);
  }
}
