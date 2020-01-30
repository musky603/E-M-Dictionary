window.onload = function()
{
	document.getElementById("result").style.display="none";
	document.getElementById("title").style.display="none";
	document.getElementById("def").style.display="none";
}

var url;
//Thanks a lot to jkelol111,Mr.Perry for providing better alternative.
 function getData() 
{
	document.getElementById("result").style.display="none";
	document.getElementById("title").style.display="none";
	document.getElementById("def").style.display="none";
	document.getElementById("list").innerHTML="";
	document.getElementById("title").innerHTML="";
	document.getElementById("partOfSpeech").innerHTML="";
	document.getElementsByClassName("noRes")[0].innerHTML = "";
	var word = document.getElementById("searchBox").value;
	if(word=="" || word==null)
	{
		document.getElementsByClassName("errorMsg")[0].innerHTML='<pre>! Enter any Medical word !</pre>';
	}
	else
	{
		url ="https://dictionaryapi.com/api/v3/references/medical/json/"+word
		+"?key=YOUR GUID";
		return fetch(url)
         .then(def => def.json())
         .then(jsonobj => {
           console.log(jsonobj[0]);
		   if(typeof(jsonobj[0])=="string")
	 	   {
	 		var sugg = jsonobj[0];
			for (var i = 1; i < jsonobj.length ; i++) 
			{
			 	sugg = sugg + ', '+jsonobj[i];
			}
			console.log(sugg);
			var show = document.getElementsByClassName("noRes")[0];
			show.style.display="block";
	 		show.innerHTML = 'Sorry! No results found. Did you mean any of '+
	 		sugg+ '?';
	 	  }
	 	 else
	 	 {
	 		var partOfSpeech = jsonobj[0].fl;
	 		console.log(typeof(jsonobj[0]));
		 	var defs= [];
		 	defs=jsonobj[0].shortdef;
	 		var output="";
		 	for (var i = 0; i < defs.length; i++) 
			{
		  		output = output + '<li class="define">'+defs[i]+'</li>';
			}
		    document.getElementById("partOfSpeech").innerHTML=partOfSpeech;
		    document.getElementById("list").innerHTML=output;
	 	 }
		 
		 
	    document.getElementById("result").style.display="flex";
	    document.getElementById("title").style.display="block";
	    document.getElementById("title").innerHTML=word;
	    document.getElementById("def").style.display="block";
		
        });
		//const def = await fetch(url);
	 	//const jsonobj = await def.json();
	 	//console.log(jsonobj[0]);
	 	
	 	
	   
	}
	
	

}


