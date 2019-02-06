import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '@core/models/course';
import { CourseService } from '@shared/services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
  course$: Observable<Course>;
  courseId: string;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
  ) {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.course$ = this.courseService.getObservableById(this.courseId);
  }


  s(a) {
    return JSON.stringify(a);
  }

}
