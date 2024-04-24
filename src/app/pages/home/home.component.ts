import {Component, OnInit} from '@angular/core';
import {setShow} from "../../services/guard/show";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
    ngOnInit(): void {
        setShow(true);
    }
}
