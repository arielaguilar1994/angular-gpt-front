import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarMenuItem } from '../../components/sidebar-menu-item/sidebar-menu-item';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterModule,
    SidebarMenuItem
  ],
  templateUrl: './dashboard-layout.html'
})
export class DashboardLayout {
  public routes = routes[0].children?.filter((route) => route.data);
}
