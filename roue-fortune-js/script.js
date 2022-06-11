// création du tableau qui va recup nos saisies
var tab_perso = []

// récupère notre input 
var saisie = document.getElementById('saisie')

// récupère notre btn html et lui applique un event
var btn = document.getElementById('div_btn-add')
btn.addEventListener('click', add)

// récupère notre btn lancer html et lui applique un event
var btn_div_lancer = document.getElementById('btn_div_lancer')
btn_div_lancer.addEventListener('click', tourneRoue)

// récupère nos checkbox
var checkbox = document.querySelectorAll('.checkbox')

// boucle sur le tableau des checkbox
checkbox.forEach( element => {
    
    // applique un event à une checkbox
    element.addEventListener('click', addCheck)

})


// function qui va ajouter notre saisie à tab_perso et affiche la roue
function add(){

    // ajoute notre saisie à tab_perso
    tab_perso.push([saisie.value , 2])
    // va dans la fonction qui affiche la roue
    drawGraph()

}

// function qui va ajouter la value de la checkbox à tab_perso et affiche la roue

function addCheck(){

    // Ajoute la value de la checkbox à tab_perso tab_perso 
    tab_perso.push([this.value , 2])
    //desactive la checkbox
    this.disabled = true;
    // va dans la fonction qui affiche la roue
    drawGraph()

}


// function qui affiche la roue
function drawGraph() {
    
    // initialise la chart google avec son type ici corechart
    google.charts.load('current', {'packages':['corechart']});
    // ici appelle drawchart et affiche la roue 
    google.charts.setOnLoadCallback(drawChart);
    
}


// function qui configure la roue
function drawChart() {
    
    // data et le tableau ou nos valeurs vont être stocker pour ensuite être affiché 
    var data = new google.visualization.DataTable();
    // ici on ajoute 2 colones une pour la valeur de la sasie la seconde pour le poucentage que la saisie va avoir
    data.addColumn('string', 'saisie');
    data.addColumn('number', 'Populartiy');

    // push nos element de tab_perso dans le tableau data
    for( i = 0; i < tab_perso.length; i++){
        
        // addRows = ajoute une ligne dans notre graph Google
        data.addRows([tab_perso[i]] )

    }

    // les options vont juste permettre de custom notre graph
    var options = {
        // ajoute un titre à la roue
        // title: 'Roue de la fortune',
        // on affiche la saisie dans le triangle du graph
        pieSliceText: 'label'
    };
  
    // recup la div avec l'id piechart pour lui ajouter le graph
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  
    // Crée la roue
    chart.draw(data, options);

    // affiche le bouton lancer
    btn_div_lancer.style.display = "block"
    // affiche la flèche
    document.getElementById('content-fleche').style.display = "block"

}


function tourneRoue(){

    // Nombre aleatoire entre 0 et 10000
    var aleatoire =  Math.floor(Math.random() * 10000)
    // Tourne la div qui contient la flèche grace à la variable aléatoire
    document.getElementById('content-fleche').style.transform = "rotate(" + aleatoire + "deg)"

}