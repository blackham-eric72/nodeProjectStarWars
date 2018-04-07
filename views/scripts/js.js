var localCharacters = [];
function swSearch() {
    console.log('search started');
    var searchName = document.getElementById('stName').value;
    var url = "https://swapi.co/api/people/?search=" + searchName;

    var swapi = new XMLHttpRequest();
    swapi.open("GET", url, true);
    swapi.setRequestHeader("Content-type", "application/json");
    
    swapi.onload = function () {
        if(this.status == 200){
            console.log(this.responseText);
            var r = JSON.parse(swapi.response);
            console.log(r);
            if(r.results.length == 0){alert("Sorry, no characters in the Database match that name. Please try again")};
            var data = r.results;
            for (var i = 0; i < data.length; i++) {
                // var characterSpecs = {name: data[i].name, mass: data[i].mass };
            //   data[i].name.toString()
                // console.log(data[i].films);
                // for (var t = 0; t<data[i].films.length; t++){
                //     var film = data[i].films[t]
                //     film = film.slice(27);
                //     film = film.slice(0,1);
                //     console.log(film);

                
                var characterDetails = "<p class='displayText'id='"+data[i].name+"' >Name: <strong>" + data[i].name + "</strong> </p>";
                characterDetails += "<ul>";
                characterDetails += "<label class ='displayText'>Gender: </label>"
                characterDetails += "<input id='" + data[i].name + "Gender' class='displayText infoInput' disabled value='" + data[i].gender + "'>";
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
    }
    swapi.send(null);
     
   
}

function saveData(name){
var birthYear = document.getElementById(name +"Birth").value;
var gender = document.getElementById(name + "Gender").value
var mass = document.getElementById(name +"Mass").value;
var height = document.getElementById(name +"Height").value;

var characterSpecs = {name: name, gender: gender, birth_year: birthYear, mass: mass, height: height};
console.log("check Local Storage"); 
if(document.getElementById('savedCharacters')){
    document.getElementById('savedCharacters').innerHTML = "";
}
var characterArray = [];
if(localStorage.getItem("localCharacters")){
    console.log('There is an item called "local Characters" ');
characterArray = localStorage.getItem("localCharacters");
characterArray = JSON.parse(characterArray);
for ( i = 0; i <= characterArray.length; i++ ){
    if (characterArray[i] == name) {
        console.log(characterArray[i] + " exists in the array, and the variable is: " + name);
        alert(name + " has already been saved");
        break;        
    }
    if( i == characterArray.length){
        console.log(name + " will be added to the array, and does not match characterarray[i]")
        characterArray.push(name);
        localStorage.setItem(name, JSON.stringify(characterSpecs));
        localStorage.setItem("localCharacters", JSON.stringify(characterArray));
        break;
    }
}
}else{
    characterArray = [name];
    localStorage.setItem("localCharacters", JSON.stringify(characterArray));
    localStorage.setItem(name, JSON.stringify(characterSpecs));
}

getData();
}
function getData(){
        if(localStorage.getItem("localCharacters")){
         var welcome = document.getElementById('welcome');
         welcome.innerHTML = "";
        var characterArray = localStorage.getItem("localCharacters");
        characterArray = JSON.parse(characterArray);
        var characterAmount = characterArray.length;
        document.getElementById('characterNum').innerHTML= "Number of Saved Characters: " + characterAmount;   
        for (i=0; i < characterArray.length; i++){
            var name = characterArray[i];
            var specs = localStorage.getItem(name);
            console.log(specs);
            specs = JSON.parse(specs);
            

{/* <label class ='flipLabel'><input class='lipCheck' type='checkbox'/><div class='card'>
        <div class='front'>Front</div>
        <div class='back>Back</div>
    </div>
</label\> */}

            var charSpecs = "<div class='localContainer'><label class ='flipLabel'>";
            charSpecs += "<input class='flipCheck' type='checkbox'/><div class='card'>";
            charSpecs += "<div class='front'>";
            charSpecs += "<h3><strong>"+ specs.name + "</strong></h3></div>";
            charSpecs += "<div class='back'>";
            charSpecs +=  "<h4><strong>"+ specs.name + "</strong></h4>";
            charSpecs += "<p>Gender: "+ specs.gender + "</p>";
            charSpecs +="<p>Born: "+ specs.birth_year + "</p>";
            charSpecs += "<p>Mass: "+ specs.mass + "</p>";
            charSpecs += "<p>Height: "+ specs.height + "</p>";
            charSpecs += "</div></div></label></div>";
            var x = document.getElementById('savedCharacters');
            x.innerHTML+=charSpecs;            
        }

    }
}

function openSaber(){
   var x = document.getElementById('blade');
    if(x.className == "open"){
        x.className = "closed";
    }else{
        x.className = "open";
    }
}
function openSaber2(){
    var x = document.getElementById('blade2');
     if(x.className == "open"){
         x.className = "closed";
     }else{
         x.className = "open";
     }
 }
var title = document.getElementById('title');
 var light1 = document.getElementById('blade');
 light1.addEventListener("animationend", glow);
 light1.addEventListener("animationend", titleGlow)
var light2 = document.getElementById('blade2');
light2.addEventListener("animationend", glow2)
 function glow() {
    this.className = "open";
    this.style.animation = "glowingSaber 2s ease-out infinite alternate";
    // this.style.animationDuration = "2s";   
 }
 function glow2(){
     this.className = "open";
     this.style.animation = "glowingSaber2 2.3s ease-out infinite alternate"
 }
 function titleGlow(){
     title.style.boxShadow = " 0px 0px 10px gold"
 }