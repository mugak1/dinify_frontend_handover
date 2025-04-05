import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend
} from "ng-apexcharts";
import { Orders, RestaurantDashboardData, Revenue } from 'src/app/_models/app.models';
import { ApiService } from 'src/app/_services/api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';




@Component({
  selector: 'app-rest-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild("chart") chart?: ChartComponent;
  restaurant!: string;
  RevenueData?: Revenue;
  OrderData?: Orders;
 // public chartOptions: Partial<ChartOptions>|any;

  constructor(private api:ApiService, private route:ActivatedRoute,public auth:AuthenticationService) {
  
    if(auth.currentRestaurantRole?.restaurant_id){
      this.restaurant=auth.currentRestaurantRole?.restaurant_id;
      this.loadData();
    }else  if(this.route.parent?.snapshot.params['id']){
      this.restaurant=this.route.parent?.snapshot.params['id'];
    this.loadData();
    }
   
/*     this.chartOptions = {
      series: [
        {
          name: "Total Order Number",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Total Order Revenues",
          data: [350000, 410000, 620000, 420000, 130000, 180000, 290000, 370000, 360000, 510000, 320000, 350000]
        },
        {
          name: "Total Payments",
          data: [870000, 570000, 740000, 990000, 750000, 380000, 620000, 470000, 820000, 560000, 450000, 470000]
        }
      ],
      chart: {
        height: 350,
        type: "line"
        
      },
    
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5],
       // colors:['#ff0000','red','red']
      },
      title: {
        text: "Total Revenues",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: (val:any, opts:any)=> {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      yaxis:{
      labels:{
        
        formatter:(val:any)=>{
          return Number(val).toLocaleString();
        }       
      }  
      
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: (val:any)=>{
                return val + " No. ";
              }
            }
          },
          {
            title: {
              formatter: (val:any)=>{
                return val + " per day";
              }
            }
          },
          {
            title: {
              formatter: (val:any)=> {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    }; */
  }
  restaurantName: string = "Your Restaurant Name";
  now: Date = new Date();

  // Revenue Data
  totalRevenue: number = 500000000;  // Example total revenue
  previousRevenue: number = 450000000;
  revenueChangePercentage: number = 0;

  // Orders Data
  totalOrders: number = 1250;
  previousOrders: number = 1100;
  ordersChangePercentage: number = 0;

  // Order Status Breakdown
  orderStatuses = {
    closed: 900,
    cancelled: 350
  };

  // Active Diners Data
  activeDiners: number = 320;
  previousActiveDiners: number = 300;
  activeDinersChangePercentage: number = 0;

  // Active Orders & Tables
  activeOrders: number = 42;
  totalOrderItems: number = 315;
  activeTables: number = 30;
  availableTables: number = 50;

  // Frequent Customers Data
  frequentCustomers = [
    { name: "Paul Mukasa", visits: 15 },
    { name: "Lou Kiror", visits: 12 },
    { name: "Dianne Kori", visits: 10 }
  ];

  // Popular Meals Data
  popularMeals = [
    { name: "Grilled Chicken", orders: 150 },
    { name: "Beef Steak", orders: 130 },
    { name: "Pasta Alfredo", orders: 120 }
  ];

  ngOnInit() {
    this.calculatePercentageChanges();
    this.startAutoUpdate();
  }

  /**
   * Calculates percentage changes for key metrics.
   */
  private calculatePercentageChanges() {
    this.revenueChangePercentage = this.calculatePercentage(this.totalRevenue, this.previousRevenue);
    this.ordersChangePercentage = this.calculatePercentage(this.totalOrders, this.previousOrders);
    this.activeDinersChangePercentage = this.calculatePercentage(this.activeDiners, this.previousActiveDiners);
  }

  /**
   * Utility function to calculate percentage change.
   * @param current - Current value.
   * @param previous - Previous value.
   * @returns Percentage change.
   */
  private calculatePercentage(current: number, previous: number): number {
    if (previous === 0) return 100; // If there was no previous data, assume 100% growth
    return ((current - previous) / previous * 100).toFixed(1) as unknown as number;
  }

  /**
   * Auto-updates the dashboard every 30 seconds.
   */
  private startAutoUpdate() {
    setInterval(() => {
      this.now = new Date();
      // Simulating a real-time update (e.g., fetching new data from API)
      this.refreshDashboardData();
    }, 30000); // Refresh every 30 seconds
  }

  /**
   * Simulates fetching new dashboard data.
   */
  private refreshDashboardData() {
    // Simulated data updates (Replace with actual API calls)
    this.totalRevenue += Math.floor(Math.random() * 10000);
    this.totalOrders += Math.floor(Math.random() * 5);
    this.activeDiners += Math.floor(Math.random() * 3);
    
    this.calculatePercentageChanges();
  }
  
  loadData(){
      this.api.get<any>(null,`reports/restaurant/dashboard1/?restaurant=${this.restaurant}`,{}).subscribe((x:any)=>{
          let d =x?.data as RestaurantDashboardData;
          this.OrderData=d.orders;
          this.RevenueData=d.revenue;
          //this.stats = d.stats;
          /* this.list=x?.data?.records as any[];  */    
        //  this.acc= this.rest?.account
     // this.list=x?.data as any;
      })
  }
 /*  totalReviews = this.fiveStarBreakdown.reduce((acc, review) => acc + review.count, 0);
  averageRating:any = (
    this.fiveStarBreakdown.reduce((acc, review) => acc + review.rating * review.count, 0) / this.totalReviews
  ).toFixed(1); */
}