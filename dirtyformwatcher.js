// $(document).ready(function () {
//     window.watched_elements = [];
//     $(".watched").each(function (item, element) {
//         $('input', element).each(function(item, element){
//             console.log(element);
//             window.watched_elements.push(element);
//         });

//         $(this).submit(function(){
//             form_submitting = true;
//         });
//     });

//     window.initial_state = $(window.watched_elements).serializeArray();
// });

var dfw = (function() {

    original_states = [];
    watched_elements = [];
    is_dirty = false;

    return {

        dfw_flag : 'dfw',
    
        watch : function(element){
            watched_elements.push(element);
            var ser_obj = $(element).serializeArray();
            original_states.push(ser_obj);

            $(element).submit(function() {
                form_submitting = true;
            });

            console.log(element);
        },

        isDirty : function(){
            console.log('dirty check');
            var current_states = []
            for (var i = 0; i < watched_elements.length; i++) {
                current_states.push($(watched_elements[i]).serializeArray())
            }

            var s1 = JSON.stringify(original_states);
            var s2 = JSON.stringify(current_states);

            return s1 != s2;
        }
    }
})();

var form_submitting = false;

window.onbeforeunload = function(){
    var confmsg = "You have elements in a form that are unsubmitted.";
  
    if(form_submitting) {
        return undefined;
    }

    if(dfw.isDirty()){
    //(e || window.event).returnValue = confmsg;
    return confmsg;
    }

    return undefined;
}

// allows forms to just have an dfw attr to be flagged as watched
$(document).ready(function () {
    $("form").each(function (item, element) {
       var watchWanted = $(element).attr(dfw.dfw_flag);
        if(watchWanted != undefined){
            dfw.watch(element);
        }
    });
});
