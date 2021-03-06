class Map {
    constructor(CityList) {
        let list = CityList;
        let regCity = /\b\w{3} ?\w+/gmi;
        let regAbr = /\b\D\w\b/gmi;
        let regLatLong = /(\-)?\d{2,3}\.\d\d\b/gmi;
        let LatLong = list.match(regLatLong);
        this.CityName = [];
        this.StateAbr = [];
        this.latitude = [];
        this.longitude = [];

        this.CityName = list.match(regCity);
        this.StateAbr = list.match(regAbr);
        for (let i = 0; i < LatLong.length; i += 2){
            this.latitude.push(LatLong[i]);
        }
        for (let i = 1; i < LatLong.length; i += 2){
            this.longitude.push(LatLong[i]);
        }
    }
    
    mostCity(parameter){
        
        if (parameter == "northernmost"){
            let position = 0;
            let max = this.latitude[0];
        this.latitude.forEach((element, i) => {
            if (max < element) {
            max = element;
            position = i;
            }
            });
            return this.CityName[position];
        }
        if (parameter == "southernmost"){
            let position = 0;
            let min = this.latitude[0];
        this.latitude.forEach((element, i) => {
            if (min > element) {
                position = i;
                min = element;
            }   
            });
            return this.CityName[position];
        }
        if (parameter == "easternmost"){
            let position = 0;
            let max = this.longitude[0];
            if (max < 0){
        this.longitude.forEach((element, i) => {
            if ((max * (-1)) > (element * (-1))) {
                position = i;
                max = element;
            }   
            });
        }
            else {
                this.longitude.forEach((element, i) => {
            if (max < element) {
                position = i;
                max = element;
            }   
            });
            }
            return this.CityName[position];
        }
        if (parameter == "westernmost"){
            let position = 0;
            let min = this.longitude[0];
            if (min < 0){
        this.longitude.forEach((element, i) => {
            if ((min * (-1)) < (element * (-1))) {
                position = i;
                min = element;
            }   
            });
        }
            else {
            this.longitude.forEach((element, i) => {
            if (min > element) {
                position = i;
                min = element;
            }   
            });
        }
            return this.CityName[position];
        }
    }
    
    closestTo(long, lat){
        let distance = [];
        for (let i=0; i < this.latitude.length; i++){
            distance[i] = Math.sqrt(Math.pow((long - this.longitude[i]), 2) + Math.pow((lat - this.latitude[i]), 2));
        }
        let position = 0;
        let min = distance[0];
        distance.forEach((element, i) => {
            if (min > element) {
            min = element;
            position = i;
            }
            });
            return this.CityName[position]
    }

    stateAbr(){
        let stateStr = "";
        let stateArr = [];
        stateArr.push(this.StateAbr[0]);
        for (let i = 0; i < this.StateAbr.length; i++){
            for (let j = 0; j < stateArr.length; j++){
                if (this.StateAbr[i] == stateArr[j]){
                stateArr[j] = this.StateAbr[i];
                break
                }
                if (this.StateAbr[i] !== stateArr[j] && j === stateArr.length - 1)
                stateArr.push(this.StateAbr[i]);
            }
        }
        for (let i = 0; i < stateArr.length; i++){
            if (i !== stateArr.length - 1)
            stateStr = stateStr + stateArr[i] + " ";
            else 
            stateStr += stateArr[i];  
        }
        return stateStr;
    }
}
let str = prompt('Введите список', '“Nashville, TN”, 36.17, -86.78 “New York, NY”, 40.71, -74.00 “Atlanta, GA”, 33.75, -84.39 “Denver, CO”, 39.74, -104.98 “Seattle, WA”, 47.61, -122.33 “Los Angeles, CA”, 34.05, -118.24 “Memphis, TN”, 35.15, -90.05');
var map = new Map(str);
let MostParameter = prompt('Введите один из вариантов: northernmost, easternmost, southernmost или westernmost');
alert(map.mostCity(MostParameter));
console.log(map.mostCity(MostParameter));
let LatParam = prompt('Введите широту');
let LongParam = prompt('Введите долготу');
console.log(map.closestTo(LongParam, LatParam));
alert(map.closestTo(LongParam, LatParam));
console.log(map.stateAbr());
alert(map.stateAbr());