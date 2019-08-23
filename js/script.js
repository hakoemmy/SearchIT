
const select = selector => {
  return document.querySelector(selector);
};

const resultsListElement = select(".list");
const searchTermElement = select("#search-term"); 
const resultsListContainer = select(".results-list ul");
const modal = select("#myModal");
const modalCloseListener = select(".close");
const modalOpenListener = select(".modalListener");
const modalCity = select("#city");
const modalGrowth = select("#growth");
const modalLatitude = select("#latitude");
const modalLongitude = select("#longitude");
const modalPopulation = select("#population");
const modalRank = select("#rank");
const modalState = select("#state");
const loadingDiv = select("#loading-div");
const noResultsDiv = select("#no-result-div");
const searchErrorDiv = select("#api-error-div");
const noSearchMatchDiv = select("#no-search-match");
const resultsCountDiv = select("#results-count");
const searchCountsHeading = select("#searches-count");

const search = ()=>{
	let searchTerm = searchTermElement.value;
	searchEngine = new SearchEngine(searchTerm);
	let search = searchEngine.startSearch();
};

class SearchEngine{
  constructor(searchTerm){
  	this.searchTerm = searchTerm;
    resultsListContainer.innerHTML = " ";
    resultsCountDiv.style.display = "none";
    loadingDiv.style.display = "none";
    noResultsDiv.style.display = "none";
    searchErrorDiv.style.display = "none";
    noSearchMatchDiv.style.display = "none";
  };

 validateInput = () =>{
    if(this.searchTerm !=""){
      //Get a rid of spaces and any special character
      this.searchTerm = this.searchTerm.trim().replace(/\s\s+/g, ' ').replace(/[^a-zA-Z0-9]/g, " ");
    	if (isNaN(this.searchTerm)) {
    		return true;
    	}else{
         return false;
      }
    }else{
       return false;
    }
 
 };
  
addCommaSeperator = (value) =>{
    let population = value.toString().split('.');
    if (population[0].length >= 5) {
        population[0] = population[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (population[1] && population[1].length >= 5) {
        population[1] = population[1].replace(/(\d{3})/g, '$1 ');
    }
    return population.join('.');
 };

 updateModal = value =>{
   const apiUrl = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
     fetch(apiUrl)
     .then(response => response.json())
     .then(data =>{
          for(const item in data){
            const result = data[item];
            if(result.rank == value){
               modalCity.innerHTML = "<b>City:</b> "+ result.city;
               let growthRateWithNoPerc= this.removePercentage(result.growth_from_2000_to_2013);
               let growthRate = this.convertStringToFloat(growthRateWithNoPerc);
               growthRateWithNoPerc = (growthRate>0)?growthRateWithNoPerc.fontcolor("green"): growthRateWithNoPerc.fontcolor("red"); 
               let formatedPopulation = this.addCommaSeperator(result.population);
                modalPopulation.innerHTML = "<b>Population: </b>"+ formatedPopulation;
                modalGrowth.innerHTML = "<b>Growth rate from 2000 to 2013:</b> "+ growthRateWithNoPerc;
                modalLongitude.innerHTML = "<b>longitude:</b>  "+ result.longitude;
                modalLatitude.innerHTML = "<b>latitude:</b> "+ result.latitude;
                modalRank.innerHTML = "<b>Rank:</b> "+ result.rank;
                modalState.innerHTML = "<b>State:</b> "+ result.state;
                modal.style.display = "block";
            }
          }
     })
     .catch(error => alert(error));

 };

 filterText = value => {
  let res = value.replace(/ +/g, " "); // remove all the spaces
  res = res.toLowerCase();
  return res;
 };

 highlit = (str, key) => {
  str = this.filterText(str);
  key = this.filterText(key);
  let newS = str.replace(key, "<span class='highlited'>" + key + "</span>");
  return newS;
  };

 removePercentage = growthRate => growthRate.slice(0, -1);

 convertStringToFloat = growthRate => parseFloat(growthRate);

 filterResult = (results)=>{
 let countSearches = 0;
 let sortedByCity = results.filter(it => new RegExp(this.searchTerm, "i").test(it.city));
 let sortedByState = results.filter(it => new RegExp(this.searchTerm, "i").test(it.state));
  countSearches += sortedByCity.length + sortedByState.length;
 let response = [...sortedByCity, ...sortedByState];
    for(let item in response){
         let city = response[item].city;
         let growth = response[item].growth_from_2000_to_2013;
         let populationOriginal = response[item].population;
         let rank = response[item].rank;
         let state = response[item].state;
         let growthRateWithNoPerc= this.removePercentage(growth);
        let growthRate = this.convertStringToFloat(growthRateWithNoPerc);
        growthRateWithNoPerc = (growthRate>0)?growthRateWithNoPerc.fontcolor("green"): growthRateWithNoPerc.fontcolor("red"); 
        let population = this.addCommaSeperator(populationOriginal);

       let listNode = document.createElement("LI");
       let spanNode = document.createElement("SPAN");
       let spanNodeForRank = document.createElement("SPAN");
       spanNodeForRank.className = "rank";
       spanNodeForRank.setAttribute("style", "display:none;");
       spanNodeForRank.setAttribute("value", rank);
       spanNode.className = "modalListener";
       spanNode.onclick = ()=>{
         this.updateModal(rank);
       }
       listNode.appendChild(spanNode);
       listNode.appendChild(spanNodeForRank);
       let textNode = this.highlit(city,this.searchTerm) +"  ,"+this.highlit(state,this.searchTerm)+"  , "+ population+",  "+" and ";
       spanNode.insertAdjacentHTML("beforeend",`${textNode} ${growthRateWithNoPerc}%`);
       spanNodeForRank.insertAdjacentHTML("beforeend",`${rank}`);
       resultsListElement.appendChild(listNode);
    
   }
   if (countSearches == 0) {
        searchCountsHeading.innerHTML = "<b>"+countSearches +"</b> "+ " search results found!";
        noSearchMatchDiv.style.display = "block";
        resultsCountDiv.style.display = "block";
        loadingDiv.style.display = "none";
   }else{
      resultsCountDiv.style.display = "block";
      searchCountsHeading.innerHTML = "<b>"+countSearches +"</b> "+ " search results found!";
      loadingDiv.style.display = "none";
   }
 };

search = () =>{
      loadingDiv.style.display = "block";
    const apiUrl = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
     fetch(apiUrl)
     .then(response => response.json())
     .then(data =>{
        this.filterResult(data);
     })
     .catch(error =>{
      searchErrorDiv.style.display = "block";
      loadingDiv.style.display = "none";
    });
 };

 startSearch = () =>{
   if (this.validateInput()) {
   	  this.search();
   }else{
        noSearchMatchDiv.style.display = "block";
        noResultsDiv.style.display = "none";
   }
 };

}

modalCloseListener.onclick = ()=>{
   modal.style.display = "none";
     }

  window.onclick = function(event) {
   if (event.target == modal) {
    modal.style.display = "none";
  }
}