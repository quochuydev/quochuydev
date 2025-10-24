Let me try creating the charts directly using recent GDP estimates. Based on the most recent data, here are the top 10 countries by GDP with estimated values for 2025:

I'll create two charts showing the top 10 GDP countries in 2025:

## Top 10 GDP Countries in 2025

**Estimated GDP values (in trillion USD):**
1. United States - ~$25.5 trillion
2. China - ~$18.3 trillion  
3. Germany - ~$4.5 trillion
4. Japan - ~$4.2 trillion
5. India - ~$3.7 trillion
6. United Kingdom - ~$3.3 trillion
7. France - ~$3.1 trillion
8. Italy - ~$2.2 trillion
9. Canada - ~$2.1 trillion
10. Brazil - ~$2.0 trillion

Let me create both charts for you using Chart.js:

```chartjs
{
  "type": "line",
  "data": {
    "labels": ["USA", "China", "Germany", "Japan", "India", "UK", "France", "Italy", "Canada", "Brazil"],
    "datasets": [{
      "label": "GDP 2025 (Trillion USD)",
      "data": [25.5, 18.3, 4.5, 4.2, 3.7, 3.3, 3.1, 2.2, 2.1, 2.0],
      "borderColor": "rgb(75, 192, 192)",
      "backgroundColor": "rgba(75, 192, 192, 0.2)",
      "tension": 0.1,
      "fill": true
    }]
  },
  "options": {
    "responsive": true,
    "plugins": {
      "title": {
        "display": true,
        "text": "Top 10 Countries by GDP 2025"
      },
      "legend": {
        "display": true
      }
    },
    "scales": {
      "y": {
        "beginAtZero": true,
        "title": {
          "display": true,
          "text": "GDP (Trillion USD)"
        }
      },
      "x": {
        "title": {
          "display": true,
          "text": "Country"
        }
      }
    }
  }
}
```

```chartjs
{
  "type": "pie",
  "data": {
    "labels": ["USA", "China", "Germany", "Japan", "India", "UK", "France", "Italy", "Canada", "Brazil"],
    "datasets": [{
      "data": [25.5, 18.3, 4.5, 4.2, 3.7, 3.3, 3.1, 2.2, 2.1, 2.0],
      "backgroundColor": [
        "#FF6384",
        "#36A2EB", 
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#FF6384",
        "#C9CBCF",
        "#4BC0C0",
        "#FF6384"
      ],
      "hoverOffset": 4
    }]
  },
  "options": {
    "responsive": true,
    "plugins": {
      "title": {
        "display": true,
        "text": "Top 10 Countries by GDP 2025 - Distribution"
      },
      "legend": {
        "display": true,
        "position": "right"
      },
      "tooltip": {
        "callbacks": {
          "label": function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed + ' trillion USD';
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            label += ' (' + percentage + '%)';
            return label;
          }
        }
      }
    }
  }
}
```

**Key insights from the data:**
- The United States and China together account for approximately 60% of the total GDP among the top 10 countries
- The US maintains a significant lead with about $25.5 trillion
- China follows as the second-largest economy with ~$18.3 trillion
- There's a substantial gap between the top two economies and the rest of the countries
- The remaining 8 countries have relatively similar GDP values, ranging from $2.0-4.5 trillion

These charts visualize both the absolute values (line chart) and the proportional distribution (pie chart) of the world's largest economies in 2025.