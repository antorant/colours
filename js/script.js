/* Author:

*/

// Global variable
colour = []

// Settings
colour.settings = {}

// Results
colour.results = {}


// Initiaze the settings controls
function initializeControls(){
  // Get the pre-defined colour
  var base = $.Color( '#' + $('#control-base').val() )

  $('#control-saturation').val( base.saturation() )
  $('#control-lightness').val( base.lightness() )



  $('.control__input').each(function(){
    updateControlReadout( $(this) )
  })


}

function updateControlReadout($el){
  value = $el.val()

  if ( $el.attr('id') == 'control-base' ) {
    $el.css({ 'color' : '#'+value, 'border-color' : '#'+value })
  } else {
    target = $el.attr('id')
    target += '__value'
    $('#'+target).val(value)
  }
}

function renderColours(){

  var base = '#' + $('#control-base').val()
  var steps = $('#control-count').val()
  var saturation = $('#control-saturation').val()
  var lightness = $('#control-lightness').val()

  var gradient = true

  var swatchWidth = 100 / ( steps )
  swatchWidth -= 1
  swatchWidth += '%'

  base = $.Color(base)

  //alert(base.hue())

  // colour.settings.hue = base.hue()
  hue = base.hue()
  // saturation = base.saturation()
  // saturation = Math.round(saturation * 10) / 10

  // lightness = base.lightness()
  // lightness = Math.round(lightness * 10) / 10

  //
  //console.log(hue, saturation, lightness)



  var interval = 360 / steps

  var hues = []

  i = 0

  while ( i < steps ) {
    newHue = hue + ( i * interval )

    //newHue > 3
    hues.push( newHue )
    i++
  }

  console.log(hues)

  timeStamp = Math.floor(Date.now() / 1000)

  $result = $('<div></div>')

  $result.addClass('result result--' + timeStamp)

  for (var i = 0; i < hues.length; i++) {
   //console.log(hues[i]);

    newColour = $.Color('#000000')
    newColour = newColour.hsla( hues[i], saturation, lightness, 1 )

    newColour = newColour.toHslaString()

    $swatch = $('<div></div>')
    $swatch.addClass('swatch')

    if ( gradient == true ) {
      $swatch.addClass('swatch--gradient')
    }
    
    $swatch.css({'background-color': newColour })

    $swatch.css({'width': swatchWidth })
    //$swatch.text(newColour)

    $result.append($swatch)
    //console.log(newColour)
  }

  $('#results').prepend( $result )
}


$('body').keyup(function(e){
  console.log(e.keyCode)
  if(e.keyCode == 32){ // space bar
     renderColours()
  }

  if( e.keyCode == 78 ) { // N
     $('#control-count').focus()
  }

  if( e.keyCode == 83 ) { // S
     $('#control-saturation').focus()
  }

  if( e.keyCode == 76 ) { // L
     $('#control-lightness').focus()
  }
})

$(document).ready(function(){

  initializeControls()
  //renderColours()


})

$(document).on('change', '.control__input', function(){
  updateControlReadout( $(this) )
})
