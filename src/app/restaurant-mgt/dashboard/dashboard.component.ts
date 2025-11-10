import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
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
  ApexLegend,
  ApexTooltip
} from "ng-apexcharts";
import { Orders, RestaurantDashboardData, Revenue } from 'src/app/_models/app.models';
import { ApiService } from 'src/app/_services/api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ChartConfiguration, ChartType } from 'chart.js';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  markers: ApexMarkers;
  yaxis?: ApexYAxis;
  grid?: ApexGrid;
  title?: ApexTitleSubtitle;
  tooltip?: ApexTooltip;
};

type TimeFrame = 'thisWeek' | 'lastWeek';

@Component({
  selector: 'app-rest-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  meals = [
    { name: 'Caesar Salad', income: 'UGX 2,920', category: 'Starters' },
    { name: 'Margherita Pizza', income: 'UGX 1,900', category: 'Mains' },
    { name: 'Cheesecake', income: 'UGX 1,200', category: 'Desserts' },
  ];
  chartType: ChartType = 'line';
  selectedTimeFrame: TimeFrame = 'thisWeek';
  comparisonPeriod='vsLastWeek'

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: '#1F2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        displayColors: false
      }
    },
    scales: {
      x: { display: false, grid: { display: false }, ticks: { display: false } },
      y: { display: false, grid: { display: false }, ticks: { display: false } }
    },
    elements: {
      line: { borderWidth: 2 },
      point: { radius: 0, hoverRadius: 5 }
    }
  };

  cards = [
    {
      title: 'Revenue',
      value: 'UGX 5.8M',
      change: '+12%',
      color: '#3B82F6', // Tailwind Blue
      data: {
        thisWeek: [3.4, 3.6, 3.9, 3.8, 4.0, 3.9, 4.4],
        lastWeek: [2.5, 2.7, 3.1, 3.4, 3.6, 4.0, 4.3]
      }
    },
    {
      title: 'Total Orders',
      value: '2,340',
      change: '+9%',
      color: '#3B82F6',
      data: {
        thisWeek: [300, 340, 310, 390, 410, 430, 460],
        lastWeek: [280, 290, 300, 310, 320, 330, 340]
      }
    },
    {
      title: 'Active Diners',
      value: '580',
      change: '+4%',
      color: '#6366F1',
      data: {
        thisWeek: [420, 440, 460, 480, 500, 540, 580],
        lastWeek: [400, 410, 420, 430, 440, 460, 470]
      }
    },
    {
      title: 'Occupied Tables',
      value: '18',
      change: '+2%',
      color: '#F59E0B',
      data: {
        thisWeek: [10, 12, 13, 15, 16, 17, 18],
        lastWeek: [8, 9, 10, 11, 12, 13, 14]
      }
    },
    {
      title: 'Top Spend',
      value: 'UGX 650K',
      change: '+8%',
      color: '#EF4444',
      data: {
        thisWeek: [100, 150, 200, 250, 400, 500, 650],
        lastWeek: [80, 100, 130, 180, 220, 300, 400]
      }
    }
  ];

  getChartData(color: string, values: number[]) {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        data: values,
        fill: true,
        tension: 0.4,
        borderColor: color,
        backgroundColor: this.createGradient(color)
      }]
    };
  }

  private createGradient(hex: string): (ctx: any) => CanvasGradient | string {
    return (ctx) => {
      const chart = ctx.chart;
      const { ctx: canvasCtx, chartArea } = chart;
      if (!chartArea) return 'rgba(0,0,0,0)';
      const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient.addColorStop(0, this.hexToRgba(hex, 0.3));
      gradient.addColorStop(1, this.hexToRgba(hex, 0));
      return gradient;
    };
  }

  private hexToRgba(hex: string, alpha: number): string {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
/*   @ViewChild("chart") chart?: ChartComponent;
  restaurant!: string;
  RevenueData?: Revenue;
  OrderData?: Orders;
  selectedTimeframe?:any
  comparisonPeriod?:any
 // public chartOptions: Partial<ChartOptions>|any;

  constructor(private api:ApiService, private route:ActivatedRoute,public auth:AuthenticationService) {
  
    if(auth.currentRestaurantRole?.restaurant_id){
      this.restaurant=auth.currentRestaurantRole?.restaurant_id;
      this.loadData();
    }else  if(this.route.parent?.snapshot.params['id']){
      this.restaurant=this.route.parent?.snapshot.params['id'];
    this.loadData();
    } */
   
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
  /* }
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
  ]; */

  // Popular Meals Data
/*   popularMeals = [
    { name: "Grilled Chicken", orders: 150 },
    { name: "Beef Steak", orders: 130 },
    { name: "Pasta Alfredo", orders: 120 }
  ]; */

 /*  ngOnInit() {
    this.calculatePercentageChanges();
    this.startAutoUpdate();
  } */

  /**
   * Calculates percentage changes for key metrics.
   */
/*   private calculatePercentageChanges() {
    this.revenueChangePercentage = this.calculatePercentage(this.totalRevenue, this.previousRevenue);
    this.ordersChangePercentage = this.calculatePercentage(this.totalOrders, this.previousOrders);
    this.activeDinersChangePercentage = this.calculatePercentage(this.activeDiners, this.previousActiveDiners);
  } */

  /**
   * Utility function to calculate percentage change.
   * @param current - Current value.
   * @param previous - Previous value.
   * @returns Percentage change.
   */
/*   private calculatePercentage(current: number, previous: number): number {
    if (previous === 0) return 100; // If there was no previous data, assume 100% growth
    return ((current - previous) / previous * 100).toFixed(1) as unknown as number;
  } */

  /**
   * Auto-updates the dashboard every 30 seconds.
   */
/*   private startAutoUpdate() {
    setInterval(() => {
      this.now = new Date();
      // Simulating a real-time update (e.g., fetching new data from API)
      this.refreshDashboardData();
    }, 30000); // Refresh every 30 seconds
  } */

  /**
   * Simulates fetching new dashboard data.
   */
  /* private refreshDashboardData() {
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
          this.RevenueData=d.revenue; */
          //this.stats = d.stats;
          /* this.list=x?.data?.records as any[];  */    
        //  this.acc= this.rest?.account
     // this.list=x?.data as any;
   /*    })
  } */
 /*  totalReviews = this.fiveStarBreakdown.reduce((acc, review) => acc + review.count, 0);
  averageRating:any = (
    this.fiveStarBreakdown.reduce((acc, review) => acc + review.rating * review.count, 0) / this.totalReviews
  ).toFixed(1); */
  // Dropdown Filters
/*   timeframes = [
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'This Year', value: 'year' }
  ];
  selectedTimeframeOptions = [
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'thisWeek' },  
    { label: 'This Month', value: 'thisMonth' },
    { label: 'This Year', value: 'thisYear' }
  ];
  selectedComparisonPeriodOptions = [
    { label: 'vs Last Week', value: 'vsLastWeek' },
    { label: 'vs Last Month', value: 'vsLastMonth' },
    { label: 'vs Last Year', value: 'vsLastYear' }
  ];


  // Summary Data
  revenueUGX = 5800000;
  revenueChange = 12;

  //totalOrders = 2340;
  ordersChange = 9;

//activeDiners = 580;

  liveOrders = 42;
  occupiedTables = 18;
  activeItems = 96;

  topCustomers = [
    { name: 'Maria Olsen', spending: 650000, orders: 12 },
    { name: 'Lawrence Thomas', spending: 420000, orders: 9 },
  ];

  popularMeals = [
    { name: 'Caesar Salad', income: 2920, category: 'Starters' },
    { name: 'Margherita Pizza', income: 1900, category: 'Mains' },
    { name: 'Cheesecake', income: 1200, category: 'Desserts' },
  ];

  // Revenue Chart (Apex)
  public revenueChart: Partial<ChartOptions>|any = {
    series: [
      {
        name: "Revenue (UGX)",
        data: [3.5, 4.0, 4.6, 4.8, 5.1, 5.4, 5.8]
      }
    ],
    chart: {
      height: 200,
      type: "line",
      toolbar: { show: false }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    markers: {
      size: 4
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      show: false
    },
    grid: {
      show: false
    },
    tooltip: {
      enabled: true
    }
  };

  // Total Orders Chart (Apex)
  public ordersChart: Partial<ChartOptions>|any = {
    series: [{ name: "Orders", data: [300, 340, 310, 390, 410, 430, 460] }],
  chart: { height: 200, type: "line", toolbar: { show: false } },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 3 },
  markers: { size: 4 },
  xaxis: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false }
  },
  yaxis: { show: false },
  grid: { show: false },
  tooltip: { enabled: true }
  };

  // Active Diners Chart (Optional)
  public dinersChart: Partial<ChartOptions>|any = {
    series: [{ name: "Diners", data: [420, 440, 460, 480, 500, 540, 580] }],
    chart: { height: 200, type: "line", toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    markers: { size: 4 },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false }
    },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: { enabled: true }
  };
} */