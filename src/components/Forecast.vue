<template>
    <div class="forecast">
      <h2>Sales and Stock Forecast</h2>
  
      <!-- Charts Section -->
      <div class="charts">
        <!-- Bar Chart: Shows monthly sales & used stocks including forecast for next month -->
        <div class="chart-container">
          <h3>Bar Chart</h3>
          <canvas id="barChart"></canvas>
        </div>
        
        <!-- Line Chart: Shows the trend of sales & used stocks -->
        <div class="chart-container">
          <h3>Line Chart</h3>
          <canvas id="lineChart"></canvas>
        </div>
        
        <!-- Pie Chart: Shows the difference (sale - used) for each month -->
        <div class="chart-container">
          <h3>Pie Chart</h3>
          <canvas id="pieChart"></canvas>
        </div>
      </div>
  
      <!-- Forecast Summary for Next Month -->
      <div class="forecast-summary">
        <h3>Forecast for Next Month</h3>
        <p>Total Sale: {{ forecastSale }}</p>
        <p>Total Used Stocks: {{ forecastUsed }}</p>
        <p>Needed Stock (Sale - Used): {{ neededStock }}</p>
      </div>
    </div>
  </template>
  
  <script>
  // Import Chart.js and register all necessary components.
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    name: "Forecast",
    data() {
      return {
        // Dummy monthly data for testing
        monthlyData: [
          { month: 'January', sale: 100, used: 80 },
          { month: 'February', sale: 120, used: 90 },
          { month: 'March', sale: 130, used: 100 },
          { month: 'April', sale: 140, used: 110 },
          { month: 'May', sale: 150, used: 120 },
          { month: 'June', sale: 160, used: 130 }
        ],
        forecastSale: 0,
        forecastUsed: 0,
        neededStock: 0,
        barChart: null,
        lineChart: null,
        pieChart: null,
      };
    },
    computed: {
      // Extract month labels from the dummy data
      months() {
        return this.monthlyData.map(item => item.month);
      },
      // Array of sale values
      saleData() {
        return this.monthlyData.map(item => item.sale);
      },
      // Array of used stock values
      usedData() {
        return this.monthlyData.map(item => item.used);
      },
      // Array of differences (sale - used) per month
      diffData() {
        return this.monthlyData.map(item => item.sale - item.used);
      }
    },
    mounted() {
      // Calculate forecast using a simple 5% growth over the last month
      let lastMonth = this.monthlyData[this.monthlyData.length - 1];
      const growthFactor = 1.05; // 5% growth
      this.forecastSale = Math.round(lastMonth.sale * growthFactor);
      this.forecastUsed = Math.round(lastMonth.used * growthFactor);
      this.neededStock = this.forecastSale - this.forecastUsed;
      
      // Render the charts after the component is mounted
      this.renderBarChart();
      this.renderLineChart();
      this.renderPieChart();
    },
    methods: {
      renderBarChart() {
        // Bar chart: Display monthly sales and used stocks plus forecast for next month
        const ctx = document.getElementById('barChart').getContext('2d');
        this.barChart = new Chart(ctx, {
          type: 'bar',
          data: {
            // Extend the months array with "Next Month" for the forecast
            labels: this.months.concat(['Next Month']),
            datasets: [
              {
                label: 'Sale',
                data: this.saleData.concat([this.forecastSale]),
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
              },
              {
                label: 'Used Stocks',
                data: this.usedData.concat([this.forecastUsed]),
                backgroundColor: 'rgba(153, 102, 255, 0.6)'
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      renderLineChart() {
        // Line chart: Show the trend of sales and used stocks
        const ctx = document.getElementById('lineChart').getContext('2d');
        this.lineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.months.concat(['Next Month']),
            datasets: [
              {
                label: 'Sale',
                data: this.saleData.concat([this.forecastSale]),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
              },
              {
                label: 'Used Stocks',
                data: this.usedData.concat([this.forecastUsed]),
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      renderPieChart() {
        // Pie chart: Show each month's difference (sale - used)
        const ctx = document.getElementById('pieChart').getContext('2d');
        this.pieChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: this.months,
            datasets: [{
              label: 'Difference (Sale - Used)',
              data: this.diffData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
              ]
            }]
          },
          options: {
            responsive: true,
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .forecast {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 30px;
  }
  
  .chart-container {
    width: 350px;
    margin: 20px;
    text-align: center;
  }
  
  .forecast-summary {
    text-align: center;
    background: #f7f7f7;
    padding: 15px;
    border-radius: 8px;
  }
  </style>
  