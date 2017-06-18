var CSSNode = document.createElement("link");
CSSNode.rel = "stylesheet";
CSSNode.href = chrome.extension.getURL("css/styles.css");
document.head.appendChild(CSSNode);

var scraperTool = document.createElement("header");
scraperTool.id = "scraper-tool";
document.body.insertBefore(scraperTool, document.body.firstChild);
$(scraperTool).load(chrome.extension.getURL("html/scraper.html"));

window.onload = function(){
	var scraperUtilityDiv = document.createElement("div");
	//insert the scraper utility div before the first body element
	document.body.insertBefore(scraperUtilityDiv, document.body.firstChild);

	scraperUtilityDiv.id = "scraper-utility";
	scraperUtilityDiv.style.position = "fixed";

    var selectedElements = [];
    var similarElements = [];

    function validTarget (target){
        return target.parents("#scraper-tool").length!=1 &&
               target.contents().length &&
               target.contents().get(0).textContent.trim().length>0;
    }
	$(window).mouseenter(function(event) {
		var target = $(event.target);
		if(validTarget(target)){
		    target.addClass("el-selection");
		}
	});

	$(window).mouseleave(function(event) {
	    $(event.target).removeClass("el-selection");
	});

	$(window).click(function(event) {
		var target = $(event.target);
		if(validTarget(target)){
            selectElement(target);
            target.addClass("el-highlight");
		}
	    return false;
	});

    function selectElement(element){
        selectedElements.push(element);
        if(selectedElements.length > 1){
            var selectorLists = selectedElements.map(function(e){
                var selectorList = e.attr('class').split(/\s+/).map(function(cls){return '.'+cls});
                removeFromArray(selectorList, '.el-highlight');
                removeFromArray(selectorList, '.el-selection');
                return selectorList;
            });
            similarElements = $(intersectionAll(selectorLists).join(''));
            updateHighlights(similarElements);
        }
    }

    var _lastHighlights = [];
    function updateHighlights(newHighlights){
        $(_lastHighlights).removeClass("el-highlight");
        $(newHighlights).addClass("el-highlight");
        _lastHighlights = newHighlights;
    }

    function removeFromArray(array, element){
        var index = array.indexOf(element);
        if(index > -1){
            array.splice(index, 1);
        }
    }

    // https://jsfiddle.net/Arg0n/zL0jgspz/2/
    function intersectionAll() {
    	var result = [];
      var lists;

      if(arguments.length === 1) {
      	lists = arguments[0];
      } else {
      	lists = arguments;
      }

      for(var i = 0; i < lists.length; i++) {
      	var currentList = lists[i];
      	for(var y = 0; y < currentList.length; y++) {
        	var currentValue = currentList[y];
          if(result.indexOf(currentValue) === -1) {
            if(lists.filter(function(obj) { return obj.indexOf(currentValue) == -1 }).length == 0) {
              result.push(currentValue);
            }
          }
        }
      }
      return result;
    }
}
