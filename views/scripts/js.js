var localCharacters = [];
function swSearch() {
    console.log('search started');
    var searchName = document.getElementById('stName').value;
    var url = "https://swapi.co/api/people/?search=" + searchName;

    var swapi = new XMLHttpRequest();
    swapi.open("GET", url, false);
    swapi.send(null);
    var r = JSON.parse(swapi.response);
    console.log(r);
    var data = r.results;

    
    for (var i = 0; i < data.length; i++) {
        // var characterSpecs = {name: data[i].name, mass: data[i].mass };
    //   data[i].name.toString()
        
        var characterDetails = "<p class='displayText'id='"+data[i].name+"' >Name: <strong>" + data[i].name + "</strong> </p>";
        characterDetails += "<ul>";
        characterDetails += "<label class ='displayText'>Born: </label>"
        characterDetails += "<input id='" + data[i].name + "Birth' class='displayText infoInput' disabled value='" + data[i].birth_year + "'>";
        characterDetails += "<label class ='displayText'>Mass: </label>"
        characterDetails += "<input id='" + data[i].name + "Mass' class='displayText infoInput' disabled value='" + data[i].mass + "'>";
        characterDetails += "<label class ='displayText'>Height: </label>"
        characterDetails += "<input id='" + data[i].name + "Height' class='displayText infoInput' disabled value='" + data[i].height + "'>";
        characterDetails += "</ul>";
        button = "<a class='btn btn-danger saveBtn' onclick='saveData("+'"' + data[i].name +'"' + ")'>"+ "Save Character" + "</a>";
        characterDetails += button;
        
        document.getElementById('info').innerHTML += characterDetails;
    }
}

function saveData(name){
var birthYear = document.getElementById(name +"Birth").value;
var mass = document.getElementById(name +"Mass").value;
var height = document.getElementById(name +"Height").value;

var characterSpecs = {name: name, birth_year: birthYear, mass: mass, height: height};

localStorage.setItem(name, JSON.stringify(characterSpecs));
console.log("check Local Storage"); 
if(localStorage.getItem("localCharacters")){
var characterArray = localStorage.getItem("localCharacters");
characterArray = JSON.parse(characterArray);
characterArray.push(name);
localStorage.setItem("localCharacters", JSON.stringify(characterArray));
}else{
    var characterArray = [name];
    localStorage.setItem("localCharacters", JSON.stringify(characterArray));
}

}
function getData(){
    console.log("Local Characters: " + localStorage.localCharacters);
// }
// function showSavedCharacters(){
    if(localStorage.getItem("localCharacters")){
        var characterArray = localStorage.getItem("localCharacters");
        characterArray = JSON.parse(characterArray);
        var characterAmount = characterArray.length;
        document.getElementById('characterNum').innerHTML= "Number of Saved Characters: " + characterAmount;

        for (i=0; i<characterArray.length; i++){
            var name = characterArray[i];
            var specs = localStorage.getItem(name);
            specs = JSON.parse(specs);
            var charSpecs = "<div class='localContainer'>";
            charSpecs += "<p><strong>"+ specs.name + "</strong></p>";
            charSpecs += "<p>Born: "+ specs.birth_year + "</p>";
            charSpecs += "<p>Mass: "+ specs.mass + "</p>";
            charSpecs += "<p>Height: "+ specs.height + "</p>";
            charSpecs += "</div>"
            var x = document.getElementById('savedCharacters');
            x.innerHTML+=charSpecs;            
        }

    }
}