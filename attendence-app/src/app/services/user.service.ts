import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AttendanceReport } from '../common/attendance-report';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private allUserUrl = 'http://localhost:8080/all-users';

  private loginUrl = 'http://localhost:8080/api/attendance/sign-in';

  private registerUrl = 'http://localhost:8080/api/register';

  private logOutUrl = 'http://localhost:8080/api/attendance/sign-out';

  private reportUrl = 'http://localhost:8080/attendance';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<User>(this.registerUrl, user)
  }

  logIn(userName: string, password: string): Observable<any> {
    return this.http.post<string>(this.loginUrl, { userName, password })
  }

  // getReport(userId: number): Observable<AttendanceReport[]> {

  //   const searchUrl = `${this.reportUrl}/search/findByRegisterId?id=${userId}`;

  //   return this.http.get<GetResponseReport>(searchUrl).pipe(
  //     map(response => response._embedded.reports)
  //   );
  // }

  logOut(attendanceId: number): Observable<any> {
    console.log(attendanceId)
    return this.http.post<any>(this.logOutUrl, { attendanceId })
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<GetResponseUsers>(this.allUserUrl).pipe(
      map(response => response._embedded.users)
    );
  }

  getReport(userId: number): Observable<AttendanceReport[]> {
    const searchUrl = `${this.reportUrl}/search/findByRegisterId?id=${userId}`;
    return this.http.get<GetResponseReport>(searchUrl).pipe(
      map(response => {
        const reports = response._embedded.reports;
        reports.forEach(report => {
          if (!report.signInTime) {
            report.signInTime = 'Absent';
            report.singOutTime = 'Absent';
          }
        });
        return reports;
      })
    );
  }

}

interface GetResponseReport {
  _embedded: {
    reports: AttendanceReport[];
  }
}

interface GetResponseUsers {
  _embedded: {
    users: User[];
  }
}
