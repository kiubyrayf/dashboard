import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  private history = [];
  public pastRoute: any;
  public prevRoute: any;
  public breadcrumbs;
  public title: string;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        const snapshot = this.router.routerState.snapshot;
        const title = route.snapshot.data['title'];
        const parent = route.parent.snapshot.data['breadcrumb'];
        const parentUrl = route.parent.snapshot.data['parentUrl'];
        const child = route.snapshot.data['breadcrumb'];
        this.breadcrumbs = {};
        this.title = title;
        this.breadcrumbs = {
          'parentBreadcrumb': parent,
          'childBreadcrumb': child,
          'parentUrlBreadcrumb': parentUrl
        };
      });
  }

  ngOnInit() { }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {  }

  public getHistory(): string[] {
    return this.history;
  }
  public getPreviousUrl() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(({urlAfterRedirects}: NavigationEnd) => {
      this.history = [...this.history, urlAfterRedirects];
      return this.history[this.history.length - 1] || '/dashboard/default';
    });

  }
}
