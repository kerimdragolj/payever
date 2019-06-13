import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { PaginationInterface } from '../../../core/interfaces/pagination.interface';
import { UserInterface } from '../../interfaces/user.interface';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.currentPage = this.activatedRoute.snapshot.queryParams.page - 1;
    if (!this.currentPage) {
      this.currentPage = 0;
      this.fetchDataByPage(this.currentPage);
    }

    this.activatedRoute.data.pipe(map(data => data.users))
      .subscribe((users: UserInterface[]) => {
        this.userList = users;
      });

    this.activatedRoute.data.pipe(map(data => data.paginationInfo))
      .subscribe((paginationInfo: PaginationInterface) => {
        this.pagesCount = paginationInfo.total;
        this.pageSize = paginationInfo.per_page;
      }).unsubscribe();
  }

  pageChanged(event: PageEvent): void {
    const page: number = event.pageIndex + 1;
    this.router.navigate(['./'], { queryParams: { page } });
  }

  userSelected(user: UserInterface): void {
    this.router.navigate(['./users', user.id]);
  }

  async fetchDataByPage(page) {
    if (page !== 1) {
      await this.router.navigate(['./'], { queryParams: { page } });
    }
  }

  async fetchPagination() {
    await this.activatedRoute.data.pipe(map(data => data.paginationInfo))
      .subscribe((paginationInfo: PaginationInterface) => {
        this.pagesCount = paginationInfo.total;
        this.pageSize = paginationInfo.per_page;
      }).unsubscribe();
  }
}
