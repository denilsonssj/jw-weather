import { Component, OnInit } from '@angular/core';
interface IPathPros {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'dashboard-layout',
  templateUrl: './dashboard.layout.html',
  styleUrls: ['./dashboard.layout.scss']
})
export class DashboardLayout implements OnInit {

  links: IPathPros[] = [
    { path: '/', label: 'Home', icon: 'home_outline' },
    { path: '/bookmarks', label: 'Bookmarks', icon: 'star_outline' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
