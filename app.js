window.onload = function()
{
	document.getElementById("result").style.display="none";
	document.getElementById("title").style.display="none";
	document.getElementById("def").style.display="none";
}

var url;
async function getData()
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
		document.getElementsByClassName("errorMsg")[0].innerHTML='<pre>! Enter any English word !</pre>';
	}
	else
	{
		url ="https://dictionaryapi.com/api/v3/references/learners/json/"+word
		+"?key=Your GUID";
		const def = await fetch(url);
	 	const jsonobj = await def.json();
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
	   
	}
	
	

}


function displayNotification(mhead,mbody) {
    if (Notification.permission == 'granted') {
      navigator.serviceWorker.getRegistration().then(function(reg) {
        var options = {
          body: mbody,
          icon: './icons/icon-96x96.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          },
          actions: [
            {action: 'explore', title: 'retry'},
            {action: 'close', title: 'close'}
          ]
        };
        reg.showNotification(mhead, options);
      });
    }
}


window.addEventListener('load', async e => {
    console.log(navigator.onLine);
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceworker.js');
            console.log('SW registered');
        } catch (error) {
            console.log('SW failed');

        }
    }
   /* if(navigator.onLine){
        navigator.serviceWorker.controller.postMessage("online");
    }
    else
    {
        displayNotification('No Internet','Please connent to a network to search a new word');
        navigator.serviceWorker.controller.postMessage("offline");
    }
    // await getData();*/
});
