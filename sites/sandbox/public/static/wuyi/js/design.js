jQuery(document).ready(function ($) {
        
        // Update text on Tshirt -- applly event on keyup
        $('#designtext').keyup(function(){
            var text = $(this).val().replace(/\r\n|\r|\n/g,"<br />");
            $('.text p').html(text);
        });

        // ON click on the new text button : clone Next text on T-shirt and add new textarea to edit text
        var count = 2; // variable to count Texts

        $('.nexText').click(function(){
           // alert(rand(20,20));
            //var count = 1;
            // clone text area and change class attribute , data-id, id and value
            $('#designtext').clone().prependTo("#texts").attr('class', 'designtext span12 designtext' + count).attr('data-id', count).attr('id', ' ').val('text ' + count);
            // clone text on T-shirt  and make draggable
            $('.text').clone().prependTo(".designContainer").attr('class', ' t text' + count).attr('data-id', count).attr('style', 'z-index:9' + count).css('top', Math.random()*100).draggable().find('p').text('text ' + count);
            count++; // increment variable when new text cloned
        });
         // update texts on keyup event - this works on cloned texts and textarea
         $( document ).on('keyup', '.designtext', function(){
            // get text from text area and replace breakline with br tag
            var text = $(this).val().replace(/\r\n|\r|\n/g,"<br />");
            //get the data-id from text
            var id = $(this).data('id');
            //update text on T-shirt
            $('.text' + id + " p").html(text);
        });

        // initial Current Text element to be edited
        var textElement = $('.designtext1 p');
         // events 

         // make texts draggable using jquery UI
        // $(function() {
        //     //$( ".t" ).resizable();
        //     $( ".t" ).draggable({
        //         // on stop make current text the element to be edited
        //         stop: function() {
        //              textElement = $(this).find('p');
        //           }
        //     });
            
        // });
        
        // on click on the text make current text the element to be edited (font size, color, font familly )
        $(document).on('click', '.t p', function(){
            textElement =  $(this);
            //add some annimations 'bounce' using CSS3 and animate.css file
             $('.slider , .pick-a-color-markup, .dropup').addClass('animated bounce');

             setTimeout(function() {
                    //remove annimation after 1s
                     $('.slider , .pick-a-color-markup, .dropup').removeClass('animated bounce');
                }, 1000);
        });

        // Actions to be apllayed on Texts
        $(document).on('click', '.action', function(){
            //get what action to use
            var action = $(this).data('action');
            // set the current element to be edited
            var currentEl = $(this);
            // find text element wich is 'P'
            textElement = $(this).parent().find('p');
            // test Action if Rmove
            if(action == 'remove'){
                // test if this is the original text (the text we clone) - if yes we can delete it , because we use it to add new texts
                if(textElement.parent().hasClass('no-delete')){
                    //we can delete it , because we use it to add new texts
                    alert("this is the orginal text you can't delete it");
                    // stop event
                    return false;
                }
                // if no - we users should confirm action (delete) 
                if(confirm('Please confirm?')){
                    // action confirmed - now get the data-id of the parrent element (div class='text') ti use it to remove textaprea
                    var inputId =  currentEl.parent().data('id');
                    // remove input (textarea)
                    $(".designtext" + inputId).remove();
                    // remove text on T-shirt
                    currentEl.parent().remove();
                }
               // if action is Edit
            }else{
                //add annmation on options available for this element (font size, font, color)
                $('.slider , .pick-a-color-markup, .dropup').addClass('animated bounce');
                // delete annimation after 2s
                setTimeout(function() {
                     $('.slider , .pick-a-color-markup, .dropup').removeClass('animated bounce');
                }, 2000);
            }
        });
            
            // function to get image preview on the t-shirt we don't need to upload it on the server using this function
            var countImg = 1;
        function readURL(input) {
            if (input.files && input.files[0]) { // if there is a file from input
                var reader = new FileReader(); // read file
                
                reader.onload = function (e) { // on load
                    // add image to imagesContainer - e.target.result : image's source on local
                     $('#imagesContainer').prepend("<div class='images' style='z-index:9" + countImg + "'><i class='icon-remove text-error'></i><img src='" + e.target.result + "' alt='' ></div>");
                     // make images draggable and resizable using jquery UI functions
                     $('#imagesContainer').find('img').resizable({
                        resize: function( event, ui ) {
                            var height = $(".ui-wrapper").height();
                            var width  = $(".ui-wrapper").width();
                            $('#imgHeight').attr('value', height);
                            $('#imgWidth').attr('value', width);
                            console.log('h, w', height, width);
                        }
                     });
                     $('#imagesContainer').find('.images').draggable({
                        containment: "#printable",
                        scoll:false,
                        drag: function() {
                            var thisPos = $(".ui-wrapper").offset();

                            var parentPos = $("#Tshirtsrc").offset();
                            var x = thisPos.left - parentPos.left;
                            var y = thisPos.top - parentPos.top;
                            $('#offsetx').attr('value', x);
                            $('#offsety').attr('value', y);
                            console.log('x, y', x, y);
                        }
                     });

                     $('#imgsrc').attr('name', 'imagesrc');
                     $('#imgsrc').attr('value', e.target.result);
                    countImg ++;
                    //$('#blah').css('background', 'transparent url('+e.target.result +') left top no-repeat');
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        // load images 
        $("#imgInp").on('change',function(){
            console.log('image changed');
            readURL(this); // call our function readURL
            
        });
        // delete pictures
        $(document).on('click', '.images .icon-remove', function(){
            // user should confirm suppression
            if(confirm('Please confirm?')){
                // if confirmed get parent and delete image
                $(this).parent().remove();
            }
        })


        //change T-shirt
        $('.tshirts a').click(function(){
            //get clicked T-shirt src
            console.log('test');
            var src = $(this).find('img').attr('src');
            //apply it on the original image to be edited
            $('#Tshirtsrc').attr('src', src);
            return false;
        });

        //change front back

        $('.t-shirts a').click(function(){
            console.log('clicked');
            //get clicked T-shirt src
            var src = $(this).find('img').attr('src');
            //apply it on the original image to be edited
            $('#Tshirtsrc').attr('src', src);
            return false;
        });

        // apply style on file's input

        // $('#imgInp').customFileInput({
        //     // put button 'browse' on right
        //     button_position : 'right'
        // });

        // Preview option (Modal)

        $('#myModal').on('shown', function () {
            //clone current design to Modal (show preview)
            $('.designContainer').clone().prependTo('.modal-body').find('i').remove();
            $('.modal-body').find('.ui-icon').css('display', 'none');
        });

        $('#myModal').on('hide', function () {
            //initialize modal preview on hidden event
          $('.modal-body').html(' ');
        })


        // Printer call

        // Hook up the print link.
        $('a.print').on('click', function() {
            //Print span6(design container) with default options
            $.print(".span6");
            
            return false;
        });

        // export as DESIGN
       


       // tooltip
        $('.font-tooltip').tooltip();

        $('.tooltip-show').tooltip({
          selector: "a[data-toggle=tooltip]"
        })
     


    });




//for on show hide working
(function ($) {
      $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
          this.trigger(ev);
          return el.apply(this, arguments);
        };
      });
    })(jQuery);



