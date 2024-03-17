import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceReport } from 'src/app/common/attendance-report';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {

  reports: AttendanceReport[] = [];
  loggedIn: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.userReport()
    })
  }

  userReport() {

    const registerId: number = +this.route.snapshot.paramMap.get('id')!;

    this.userService.getReport(registerId).subscribe(
      data => {
        this.reports = data;
      }
    );
  }


}
