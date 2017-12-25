//Grid parameters
$(document).ready(function () {
  var width=$('#input_width').val();
  var height=$('#input_height').val();
  //Color from colorPicker
  var color=$('#color').val();
  var table=$('#pixel_canvas');
  //For mouse effects only
  //Checks if mouse button is pushed
  var mflag =false;
  //Checks if control is pushed
  var cflag=true;
  //Cell width and height
  var cellSize=$('#input_cell').val();
  //Farbtastic colorpicker
  $('#colorpicker').farbtastic('#color');
  //Colorpicker set X,Y
  function makeOffSet(index, coords) {
      //Colorpicker offset
      var parentWidth=$('.options').css("width");
      var parentOffSetLeft=$('.options').offset().left;

      var getLeft=(parseInt(parentWidth) - 195)/2+parentOffSetLeft;
      return {top:coords.top, left:getLeft};
  }
  $('#colorpicker').offset(makeOffSet);
  //Event listeners for  width/height changes
  $('#input_width').change(function() {
      width=$('#input_width').val();
      $('#input_width').prop("value", width);
  });
  $('#input_height').change(function() {
      height=$('#input_height').val();
      $('#input_height').prop("value", height);
  });
  $('body').css('heigth',$(window).height());
  $('#input_cell').change(function() {
      cellSize=$('#input_cell').val();
      $('#input_cell').prop("value", cellSize);

  });
  //Event listener for color value
  $('#colorpicker').click(function() {
      color=$('#color').val();
  });
  $("body").keydown(function(event){
    if((event.keyCode == 13)||(event.keyCode==27))
      $(".options").slideToggle(750);
  });
  //Event listener for Make Grid button
  $('.myP').click(function() {
      $(".options").slideToggle(750);
      setTimeout(function() {checkSize()},1000);
  });
    //Mouse effect system start
  $('#pixel_canvas').on("mouseleave",function() {
    if(cflag)
      mflag=false;
  });

  $('#pixel_canvas').on("mousedown","td", function() {
      if(cflag) {
          $(this).css("background-color", color);
      }
      else {
          $(this).css("background-color", "#fee6e6");
      }
      mflag=true;
  });
  $('#pixel_canvas').on("mouseup","td", function() {
      if(cflag && mflag) {
          $(this).css("background-color", color);
      }
      else {
          $(this).css("background-color", "#fee6e6");
      }
      mflag=false;
  });
  $('.content').on("mouseenter",'td', function() {
      if(mflag && cflag) {
          $(this).css("background-color", color);
      }
      if(!cflag && mflag) {
          $(this).css("background-color", "#fee6e6");
      }
  });
  //Mouse effect system end

  //Eraser cursor
  $('body').keydown(function(event) {
      if(event.keyCode==17) {
          $('body').addClass("cursor");
          cflag=false;
      }
  });
  $('body').keyup(function(event) {
      if(event.keyCode==17) {
          $('body').removeClass("cursor");
          cflag=true;
      }
  });
  function checkSize() {
      if((height*cellSize)>(0.8*$(window).height())) {
          height=parseInt(0.8*$(window).height()/cellSize);
          $('#input_height').prop("value", height);
      }
      if((width*cellSize)>$(window).width()) {
          width=parseInt($(window).width()/cellSize);
          $('#input_width').prop("value", width);
      }
    makeGrid();
  }
  //Main function that draws a grid
  function makeGrid() {
    //Sets previous content to null
    $('#pixel_canvas').html("");
    //Draws a new Grid
    $('#pixel_canvas').html(function(index,content) {
      for(var i=0;i<height;i++) {
          content+="<tr>";
          for(var j=0;j<width;j++) {
              content +="<td></td>";
          }
          content+="</tr>";
      }
      return content;
    });
    $('td').css("height",cellSize);
    $('td').css("width",cellSize);
  }


});
