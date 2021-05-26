import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomTitleComponent } from './components/custom-title/custom-title.component';
import { NotesComponent } from './components/notes/notes.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CustomTitleComponent
  },
  {
    path: 'notes',
    component: NotesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
