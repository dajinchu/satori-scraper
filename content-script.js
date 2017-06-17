window.onload = function(){
	var scraperUtilityDiv = document.createElement("div");

	//insert the scraper utility div before the first body element
	document.body.insertBefore(scraperUtilityDiv, document.body.firstChild);

	scraperUtilityDiv.id = "scraper-utility";
	scraperUtilityDiv.style.position = "fixed";
	
	//load scraper.html into scraperUtilityDiv
	$(scraperUtilityDiv).load(chrome.extension.getURL("html/scraper.html"));
	/* scraperUtilityDiv.innerHTML = "<object type='text/html' data='scraper.html'></object>"; */
}