(function () { //wrap in IIFE to avoid polluting global namespace

var lastFocusedItem;

$(document).ready(function(){
    addFormListener();
    addSubmitButtonListener();
    addSelectorListener();
    addNewRow();
});

function addFormListener(){
    //Figure out which form was focused last so when a selector is picked is goes to the right row
    lastFocusedItem = $(".form").get(0);
    $("#form-container").on('click','.form', function(){
        if($(lastFocusedItem).is(this))return;
        lastFocusedItem = this;
        console.log('clic');
        chrome.runtime.sendMessage({
            action: 'user-selection',
            selector:  $(this).find('input.selector-input').val()
        });
    });

    //Listen to if the user wants to give their own selector
    $("body").on('input','input.selector-input', function (e) {
        chrome.runtime.sendMessage({
            action: 'user-selection',
            selector: $(this).val()
        });
    });

    $('body').on('input', '#form-container>div:last-child input', function(e){
        addNewRow();
    });
}

function addSubmitButtonListener(){
    $("button#submit").on('click',function(){
        var datum = JSON.stringify({
            "url": window.location.href,
            "fields":getItems(),
            "frequency": "test",
            "channel": {
                "key": "DeB404B291708e7C1CFF9EBFc2ABEF16",
                "url": "wss://ww7yyumg.api.satori.com"
            }
        });
        chrome.runtime.sendMessage({
            action: 'xhttp',
            url:"http://192.168.1.62:3000/queries",
            type: 'POST',
            processData: false,
            headers: {
                'content-type':"application/json"
            },
            data: datum
        }, function(responseText) {
            /*Callback function to deal with the response*/
        });
    });
}

function addSelectorListener(){
    chrome.runtime.onMessage.addListener(function(request, sender, callback) {
        if (request.action == "selection" && request.selector) {
            $(lastFocusedItem).find("input.selector-input").val(request.selector);
            $(lastFocusedItem).find("p.element-count").text((request.count>0)?request.count+' elements':'');
            $(lastFocusedItem).find("p.field-example").text(request.example);
        }
    });
}

function addNewRow(){
    var newrow = $('<div class="row"></div>');
    newrow.load('formrow.html', function(){
        $('#form-container').append(newrow);
        chrome.runtime.sendMessage({
            action: 'resize',
            height: document.body.scrollHeight
        });
    });
}

function getItems(){
    var itemlist = [];
    $("#form-container").find("form").each(function(idx,form){
        var item = $(form).serializeObject();
        item.identifier = false;
        itemlist.push(item);
    });
    if(itemlist.length>0)itemlist[0].identifier=true;
    return itemList;
}

//Form serialization
jQuery.fn.serializeObject = function() {
  var arrayData, objectData;
  arrayData = this.serializeArray();
  objectData = {};

  $.each(arrayData, function() {
    var value;

    if (this.value != null) {
      value = this.value;
    } else {
      value = '';
    }

    if (objectData[this.name] != null) {
      if (!objectData[this.name].push) {
        objectData[this.name] = [objectData[this.name]];
      }

      objectData[this.name].push(value);
    } else {
      objectData[this.name] = value;
    }
  });

  return objectData;
};
})();
