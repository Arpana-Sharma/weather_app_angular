import { Component, inject, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Temp } from '../../Temp';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-display-bar',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, HttpClientModule],
  templateUrl: './display-bar.component.html',
  styleUrl: './display-bar.component.css'
})
export class DisplayBarComponent implements OnInit {
  ngOnInit(): void {
    this.fetchData("Paris");
  }
  wthr_report: Temp = {
    city: '', country: '', icon: '', date: '', description: '', temp: 0, sunrise: '', sunset: '',
    pressure: 0, app_temp: 0, rel_humidity: 0, visibility: 0, wind_speed: 0, wind_dir: 0, aqi: 0,
    precip: 0, snow: 0, wthr_code: 0,
  };
  wthrBg: string = "cloudy";
  httpClient = inject(HttpClient);
  citySearch(city: string) {
    this.fetchData(city);
  }
  bgImage(code: number) {
    if ((code >= 200) && (code <= 233)) {
      this.wthrBg = "thunderstrom";
    }
    else if ((code >= 300) && (code <= 302)) {
      this.wthrBg = "drizzle";
    }
    else if ((code >= 500) && (code <= 522)) {
      this.wthrBg = "rain";
    }
    else if ((code >= 600) && (code <= 623)) {
      this.wthrBg = "snow";
    }
    else if ((code >= 700) && (code <= 751)) {
      this.wthrBg = "fog";
    }
    else if ((code >= 800) && (code <= 802)) {
      this.wthrBg = "sun";
    }
    else if ((code >= 803) && (code <= 804)) {
      this.wthrBg = "cloudy";
    }
  }
  convertLocalTemp(time: string, timezone: string) {
    let cur_date = new Date;
    let curDateString = cur_date.toString();
    let year = cur_date.getFullYear().toString();
    this.wthr_report.date = new Date((typeof curDateString==="string" ? new Date(curDateString) : curDateString)
    .toLocaleString("en-US", {timeZone: timezone})).toString();
    this.wthr_report.date=this.wthr_report.date.split("GMT")[0];
    time = cur_date.toDateString().split(",")[0] + ", " +
      time + " UTC";
    time=new Date((typeof time==="string" ? new Date(time) : time)
    .toLocaleString("en-US", {timeZone: timezone})).toString();
    time=time.split("GMT")[0];
    time=time.split(year)[1];
    return time;
  }

  makeWthrReport(data: any) {
    this.wthr_report.city = data.data[0].city_name;
    this.wthr_report.country = data.data[0].country_code;
    this.wthr_report.aqi = data.data[0].aqi;
    this.wthr_report.app_temp = data.data[0].app_temp;
    this.wthr_report.precip = data.data[0].precip;
    this.wthr_report.visibility = data.data[0].vis;
    this.wthr_report.pressure = data.data[0].pres;
    this.wthr_report.rel_humidity = data.data[0].rh;
    this.wthr_report.snow = data.data[0].snow;
    this.wthr_report.temp = data.data[0].temp;
    this.wthr_report.sunrise = data.data[0].sunrise;
    this.wthr_report.sunset = data.data[0].sunset;
    this.wthr_report.description = data.data[0].weather.description;
    this.wthr_report.icon = `https://cdn.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`;
    this.wthr_report.wind_speed = data.data[0].wind_spd;
    this.wthr_report.wind_dir = data.data[0].wind_dir;
  }

  fetchData(City: string) {
    this.httpClient
      .get(`https://api.weatherbit.io/v2.0/current?&city=${City}&key=9fdb5471c40c4c5eaeb668d5b1439a5b`)
      .subscribe((data: any) => {
        this.makeWthrReport(data);
        this.bgImage(data.data[0].weather.code);
        this.wthr_report.sunrise = this.convertLocalTemp(data.data[0].sunrise, data.data[0].timezone);
        this.wthr_report.sunset = this.convertLocalTemp(data.data[0].sunset, data.data[0].timezone);
      })
  }
}
