import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() citySearch: EventEmitter<string> = new EventEmitter();
  city!: "";
  onSubmit() {
    this.citySearch.emit(this.city);
    this.city = "";
  }

}
