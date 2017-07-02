var selectedElements = [];
var similarElements = [];
var boxselector = '';
var iframe;

$(document).ready(function(){
    injectIFrame();
});
enableHighlighting();

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    console.log(request);
    if (request.action == "user-selection") {
        if(request.selector && request.selector.length>0){
            similarElements = $(request.selector);
        } else {
            similarElements = [];
        }
        selectedElements = [];
        updateHighlights(similarElements);
        chrome.runtime.sendMessage({
            action: 'selection',
            selector: request.selector,
            count: similarElements.length,
            example: example(similarElements)
        });
    }
    if(request.action == "resize"){
        iframe.height(request.height);
    }
    if(request.action == "boxselector"){
        boxselector = request.selector;
    }
});

function injectIFrame(){
    var iframeContainer = $('<div id="scraper-tool">');
    iframeContainer.prependTo(document.body);

    iframe = $('<iframe id"scraper" frameBorder="0" scrolling="no">');
    iframe.attr('src', chrome.extension.getURL("html/scraper.html"));
    iframe.appendTo(iframeContainer);
}

function validTarget (target){
    return (boxselector.length==0 || target.parents(boxselector).length) &&
            ((target.contents().length &&
             target.contents().text() &&
             target.contents().text().length>0) ||
             target.prop('tagName')=="IMG");
}
function selectElement(element){
    selectedElements.push(element);
    element.addClass("el-highlight");
    if(selectedElements.length > 1){
        var selectorLists = selectedElements.map(function(e){
            var selectorList = e.attr('class').split(/\s+/).map(function(cls){return '.'+cls});
            removeFromArray(selectorList, '.el-highlight');
            removeFromArray(selectorList, '.el-selection');
            return selectorList;
        });
        var selector = intersectionAll(selectorLists).join('')

        similarElements = $(selector);
        if(similarElements.length==0){
            selectedElements = [];
        }
        updateHighlights(similarElements);

        chrome.runtime.sendMessage({
            action: 'selection',
            selector: selector,
            count: similarElements.length,
            example: example(similarElements)
        });
    }
}

function example(elements){
    if(elements.length>0){
        var first = $(elements.get(0));
        if(first.prop('tagName')=="IMG"){
            return first.prop('src');
        }else{
            return first.text();
        }
    }else{
        return '';
    }
}

var _lastHighlights = [];
function updateHighlights(newHighlights){
    $(".el-highlight").removeClass("el-highlight");
    if(boxselector.length>0){
        $(boxselector).find(newHighlights).addClass("el-highlight");
    }else{
        $(newHighlights).addClass("el-highlight");
    }
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
function enableHighlighting(){
    //highlighting
    $(window).mouseenter(function(event) {
        var target = $(event.target);
        if(validTarget(target)){
            target.addClass("el-selection");
        }
    });

    $(window).mouseleave(function(event) {
        $(event.target).removeClass("el-selection");
    });

    $('*').removeAttr('onclick');
    $('*').off('click')

    $(window).on('click', function(event) {
        var target = $(event.target);
        if(validTarget(target)){
            selectElement(target);
        }
        return false;
    });
}
