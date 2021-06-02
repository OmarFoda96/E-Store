import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  constructor(private productService: ProductsService) {}
  getAllStatistics() {
    this.productService.getAllStats().subscribe((data: any) => {
      this.stats = data;
    });
  }

  stats = null;

  ngOnInit(): void {
    this.getAllStatistics();
  }
}
