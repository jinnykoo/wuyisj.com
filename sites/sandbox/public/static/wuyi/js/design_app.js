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
        $(function() {
            //$( ".t" ).resizable();
            $( ".t" ).draggable({
                // on stop make current text the element to be edited
                stop: function() {
                     textElement = $(this).find('p');
                  }
            });
            
        });
        
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

        //font size using Slider based on jquery UI sliders
         $( "#slider" ).slider({
            range: "max", // set range Type
            min: 1, // set a minimum value
            max: 100, //a max value
            value: 11, // default value
            slide: function( event, ui ) { // event onslider
                $( ".size" ).text(ui.value + "px"); // update text on slider
                if(textElement != null){ // if text element is not null
                textElement.css( "font-size", ui.value); // apply value on text (font-size) using css function (jquery)
            }
                }
            });
            $( ".size" ).text($( "#slider" ).slider( "value" ) +   "px"); // get default value from slider and show it to the user

            //Edit text's font - Get selected font on event Click
            //google.load('webfont','1');
            $('#font a').click(function(){
                // test if current text is not null ()
                if (textElement != null) {
                    // get font name from clicked element (data-font='font name')
                    var font = $(this).data('font');
                    // apply a loading style
                    $('.designContainer').prepend("<div class='loading'></div>");

                    //google font loader API config
                    WebFontConfig = {
                        // get selected font
                        google: { families: [ font ],
                        text: 'abcdedfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!' },
                            //loading: function() {}, // function when loading font
                            //active: function() {},// function when font is active
                            //inactive: function() {}, // function if font is inactive
                            //fontloading: function(familyName, fvd) {alert('fontloading')}, // font loading
                            fontactive: function(familyName, fvd) { // function if font is action and we get fontName in args
                                // we apply font on the slelected text using css function (Jquery)
                                textElement.css('font-family', familyName);
                                // remove loading annimation
                                $('.designContainer').find(".loading").remove();
                            },
                            fontinactive: function(familyName, fvd) { // if font is innactive 
                                // show alert ti the user
                                alert('this font no longer available, please choose another one from list');
                                // remove loading annimation
                                $('.designContainer').find(".loading").remove();
                            },
                        // timeout  if google load font take a longer time
                        timeout: 5000
                            
                    }
                        // load google font API script
                        var wf = document.createElement('script');
                        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                        '://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
                        wf.type = 'text/javascript';
                        wf.async = 'true';
                        var s = document.getElementsByTagName('script')[0];
                        s.parentNode.insertBefore(wf, s);
                };
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
                     $('#imagesContainer').find('img').resizable();
                     $('#imagesContainer').find('.images').draggable();

                    countImg ++;
                    //$('#blah').css('background', 'transparent url('+e.target.result +') left top no-repeat');
                }
                reader.readAsDataURL(input.files[0]);
            }
        }
        // load images 
        $("#imgInp").on('change',function(){
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

        // Text Color picker
        $(".pick-a-color").pickAColor({
            showSpectrum            : true,
            showSavedColors         : true,
            saveColorsPerElement    : true,
            fadeMenuToggle          : true,
            showAdvanced            : true,
            showHexInput            : true,
            showBasicColors         : true
        });

        // event on color change ( get selected color)
        $("input#color").on("change", function () {
            // get value from input
            var color  = $(this).val();
            // if textElement is not null
            if(textElement != null){
                //apply css on the text
                textElement.css('color','#' + color);
            }
            
        });

        //change T-shirt
        $('.tshirts a').click(function(){
            //get clicked T-shirt src
            var src = $(this).find('img').attr('src');
            //apply it on the original image to be edited
            $('#Tshirtsrc').attr('src', src);
            return false;
        });

        // apply style on file's input

        $('#imgInp').customFileInput({
            // put button 'browse' on right
            button_position : 'right'
        });

        // Preview option (Modal)

        $('#myModal').on('shown', function () {
            //clone current design to Modal (show preview)
            $('.designContainer').clone().prependTo('.modal-body').find('i').remove();
            $('.modal-body').find('.ui-icon').css('display', 'none');
        });

        $('#myModal').on('hidden', function () {
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









