const ctx = document.getElementById('grafico');

new Chart(ctx, {

type: 'line',

data: {

labels: ['Jan', 'Fev', 'Mar', 'Abr'],

datasets: [{
label: 'Forecast de Demanda',
data: [1000, 1200, 1100, 1300],
borderWidth: 3
}]

}

});