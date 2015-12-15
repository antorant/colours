/* Author:

*/

// A list of IDs (Beethoven recordings)
idList = [
  1194866,
  3877357,
  5577926,
  6515012,
  1194915,
  6515694,
  523750,
  5295233,
  1195076,
  2450154,
  2457030,
  2451705,
  2932445,
  223172,
  5945829,
  4834687,
  6515761,
  6515609,
  7684612,
  8031015,
  4835490,
  1195043,
  5427456,
  5304867,
  1008903,
  3011227,
  3010777,
  6516261,
  6515392,
  6443965,
  2351016,
  8047691,
  7468032,
  6880964,
  2911533,
  5542383,
  2217809,
  6133093,
  1196537,
  3879869,
  60631761,
  119516170,
  6063715,
  1195825,
  7467661,
  60649281,
  4831474,
  6515852,
  6122404,
  6122421,
  527636,
  6515503,
  3569672,
  4686119,
  4880867,
  4880841,
  4879890,
  4879864,
  3573396,
  1652945,
  1653762,
  1655172,
  1656099,
  523932,
  4389343,
  537769,
  4389567,
  5688574,
  4389583,
  4389599,
  1657981,
  4986386,
  1762943,
  5688546,
  524908,
  7939272,
  7941143,
  7945213,
  526209,
  4882313,
  4882081,
  4881749,
  4881619,
  554560,
  4881387,
  292013112,
  574745812,
  5747023,
  2923527,
  5746217,
  595499330,
  574544630,
  574392630,
  5743901,
  56833325,
  56828885,
  1195011,
  5682844102,
  5682479102,
  5899782,
  1196309,
  3240351,
  5554684,
  5896479,
  5519913,
  2522070,
  6681325,
  6681373,
  6681536,
  6440466,
  6440757,
  6440808,
  419574,
  5944775,
  5953084,
  11964849,
  42792819,
  7907479,
  11963999,
  3778311,
  3778552,
  3878127,
  1595516,
  3778641,
  5751450,
  6374109,
  5750694,
  5750651,
  5427694,
  7875520,
  5417953,
  6825780,
  6826575,
  6826590,
  5417779,
  5416811,
  5734875,
  6516157
];

// build elements array:
elements = []
// for each id...
for (var i = 0; i < idList.length; i++) {
  // convert to a string...
  id = idList[i].toString()

  // and break it into characters
  idChars = id.split('')

  // a variable for the sum
  sum = 0

  // each character...
  for (var j = 0; j < idChars.length; j++) {
    // to an integer
    idChars[j] = parseInt(idChars[j])
    // add to the sum
    sum += idChars[j]
  }

  // add an item containing calculated value to the elements array
  elements.push({'id':idList[i], 'sum': sum})
}


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

  // proportional widths for the swatchs
  // var swatchWidth = 100 / ( elements.length )
  // swatchWidth -= 1
  // swatchWidth += '%'

  // get the base colour
  base = $.Color(base)

  // get the hue
  hue = base.hue()

  // calculate the hue intervals
  var interval = 360 / steps

  // an array for the hue steps
  var hues = []

  // build hue steps array
  i = 0
  while ( i < steps ) {
    newHue = hue + ( i * interval )

    hues.push( newHue )
    i++
  }

  // a unique ID for the result
  timeStamp = Math.floor(Date.now() / 1000)

  // an element for the swatches
  $result = $('<div></div>')

  // attach the ID as a class
  $result.addClass('result result--' + timeStamp)

  // // create an element for the codes
  // $resultCodes = $('<pre></pre>')
  // // attach the ID as a class
  // $resultCodes.addClass('result__codes result--' + timeStamp)

  // an array for the colours
  var colours = []

  // generate the colours
  for (var i = 0; i < hues.length; i++) {

    // something to work with
    newColour = $.Color('#000000')

    // apply properties from defined settings
    newColour = newColour.hsla( hues[i], saturation, lightness, 1 )

    // get hsla and hex strings
    newColourHsla = newColour.toHslaString()
    newColourHex = newColour.toHexString()

    colours.push({'hex': newColourHex, 'hsla': newColourHsla})
  }

  // console.log(colours)

  // render the elements
  for (var i = 0; i < elements.length; i++) {
    // create the swatch element
    $swatch = $('<div></div>')
    $swatch.addClass('swatch')

    // TODO create a control for this
    if ( gradient == true ) {
      $swatch.addClass('swatch--gradient')
    }

    // get the "sum" calculated from the ID
    sum = elements[i]['sum']

    // use modulo to bring into range 0-steps
    modulo = sum % steps

    // apply the step colour to the swatch
    $swatch.css({'background-color': colours[modulo]['hsla'] })

    // apply the width
    //$swatch.css({'width': swatchWidth })

    // add the swatch to the result container
    $result.append($swatch)

  }

  // // print out the codes
  // $resultCodes.text( colourCodes.join(' ') )
  //
  // // render the codes element
  // $('#results').prepend( $resultCodes )
  //
  // render the swatches element
  $('#results').prepend( $result )
}


$('body').keyup(function(e){
  //console.log(e.keyCode)
  if(e.keyCode == 32 || e.keyCode == 13){ // space bar
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
