import { Component, OnInit } from '@angular/core';


interface IPathPros {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.layout.html',
  styleUrls: ['./dashboard.layout.scss']
})
export class DashboardLayout implements OnInit {

  links: IPathPros[] = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/bookmarks', label: 'Bookmarks', icon: 'star' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
