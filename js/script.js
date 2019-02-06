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

  var gradient = false

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


  // a unique ID for the result
  timeStamp = Math.floor(Date.now() / 1000)

  // an element for the swatches
  $result = $('<div></div>')

  // attach the ID as a class
  $result.addClass('result result--' + timeStamp)

  // an array for the HEX codes
  var colourCodes = []

  // create an element for the codes
  $resultCodes = $('<pre></pre>')
  // attach the ID as a class
  $resultCodes.addClass('result__codes result--' + timeStamp)

  // generate the swatches and codes
  for (var i = 0; i < hues.length; i++) {

    // something to work with
    newColour = $.Color('#000000')

    // apply properties from defined settings
    newColour = newColour.hsla( hues[i], saturation, lightness, 1 )

    // get hsla and hex strings
    newColourHsla = newColour.toHslaString()
    newColourHex = newColour.toHexString()

    colourCodes.push(newColourHex)

    // create the swatch element
    $swatch = $('<div></div>')
    $swatch.addClass('swatch')

    // TODO create a control for this
    if ( gradient == true ) {
      $swatch.addClass('swatch--gradient')
    }

    // apply the colour to the swatch
    $swatch.css({'background-color': newColourHsla })

    // apply the width
    $swatch.css({'width': swatchWidth })

    // add the swatch to the result container
    $result.append($swatch)
  }

  // print out the codes
  $resultCodes.text( colourCodes.join(' ') )

  // render the codes element
  $('#results').prepend( $resultCodes )

  // render the swatches element
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
