import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    // {
    //     path: '',
    //     component: AdminComponent,
    //     children: [
    //         { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    //         { path: 'dashboard', component: DashboardComponent },
    //         // { path: 'posts/:id', component: PostViewComponent },
    //         // {
    //         //     path: 'dashboard',
    //         //     component: PostDashboardComponent,
    //         //     canActivate: [AuthGuard],
    //         // },
    //         { path: '**', redirectTo: 'dashboard' }
    //     ]
    // },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }
