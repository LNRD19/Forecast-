<template>
  <div class="container">
    <h1>Sales Forecasting Tool</h1>

    <!-- Data Input Section -->
    <section id="data-input">
      <h2>Input Historical Sales Data</h2>
      <label for="date">Date:</label>
      <input type="date" v-model="newSale.date" required />

      <label for="sales-amount">Sales Amount:</label>
      <input type="number" v-model="newSale.amount" required />

      <button @click="addData">Add Data</button>
    </section>

    <!-- Forecast Parameters Section -->
    <section id="forecast-parameters">
      <h2>Forecast Parameters</h2>

      <label for="growth-rate">Expected Growth Rate (%):</label>
      <input type="number" v-model="growthRate" />

      <label for="seasonality">Seasonality:</label>
      <select v-model="seasonality">
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <button @click="calculateForecast">Calculate Forecast</button>
    </section>

    <!-- Results Section -->
    <section id="results" v-if="forecastResults.length > 0">
      <h2>Forecast Results</h2>
      <ul>
        <li v-for="(result, index) in forecastResults" :key="index">
          {{ result.date }} - Forecast Sales: ${{ result.sales }}
        </li>
      </ul>
    </section>

    <!-- Sales Visualization -->
    <section id="visualization">
      <h2>Sales Visualization</h2>
      <!-- Visualization will be rendered here -->
      <!-- You can integrate a charting library like Chart.js or similar here -->
    </section>

    <button @click="downloadResults" v-if="forecastResults.length > 0">Download Results</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newSale: {
        date: '',
        amount: null,
      },
      salesData: [],
      growthRate: 0,
      seasonality: 'no',
      forecastResults: [],
    };
  },
  methods: {
    addData() {
      if (this.newSale.date && this.newSale.amount) {
        // Add sale data
        this.salesData.push({
          date: this.newSale.date,
          amount: parseFloat(this.newSale.amount),
        });

        // Reset newSale input
        this.newSale.date = '';
        this.newSale.amount = null;
      } else {
        alert('Please enter both date and sales amount');
      }
    },

    calculateForecast() {
      if (!this.salesData.length) {
        alert('Please add some historical sales data before calculating the forecast.');
        return;
      }

      this.forecastResults = [];
      let latestSale = this.salesData[this.salesData.length - 1];

      for (let i = 1; i <= 12; i++) {
        let forecastDate = new Date(latestSale.date);
        forecastDate.setMonth(forecastDate.getMonth() + i);
        let forecastSales = latestSale.amount * (1 + this.growthRate / 100);

        // Apply seasonality effect if selected
        if (this.seasonality === 'yes') {
          forecastSales *= 1 + Math.sin((Math.PI / 6) * (i % 12)); // Example seasonal effect (using sine wave)
        }

        this.forecastResults.push({
          date: forecastDate.toLocaleDateString(),
          sales: forecastSales.toFixed(2),
        });

        latestSale = { date: forecastDate.toLocaleDateString(), amount: forecastSales };
      }
    },

    downloadResults() {
      const csvContent = 'Date,Forecast Sales\n' + this.forecastResults.map(result => `${result.date},${result.sales}`).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'sales_forecast.csv';
      link.click();
    },
  },
};
</script>
<style scoped>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      text-align: center;
      color: #333;
    }
    section {
      margin-bottom: 20px;
      padding: 15px;
      border-radius: 5px;
      background-color: #e9ecef;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input[type="date"],
    input[type="number"],
    select {
      width: calc(100% - 12px);
      padding: 8px;
      margin-bottom: 10px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    button {
      background-color: #007bff;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background-color: #0056b3;
    }
    #results {
      display: block;
    }
</style>
