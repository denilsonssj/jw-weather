import { Component, OnInit } from '@angular/core';


interface IPathPros {
  path: string;
  label: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.layout.html',
  styleUrls: ['./dashboard.layout.scss']
})
export class DashboardLayout implements OnInit {

  links: IPathPros[] = [
    { path: '/', label: 'Home' },
    { path: '/bookmarks', label: 'Bookmarks' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
