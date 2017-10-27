function init(){
  var context;//used to store last object clicked
  var throttle = function(func, limit) {
    var inThrottle = undefined;
      return function() {
        var args = arguments,
        context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          return setTimeout(function() {
            return inThrottle = false;
          }, limit);
        }
      };
  };

  function mouseDown(evt){
    context = this;
  }

  function handleDragStart(evt) {
    var style = this.style,
    offsets = this.getBoundingClientRect(),
    top = offsets.top - evt.clientY,
    left = offsets.left - evt.clientX;

    //left = parseInt(evt.target.offsetLeft,10) - evt.clientX,
    //top = parseInt(evt.target.offsetTop,10) - evt.clientY

    style.opacity= "0.8";
    evt.dataTransfer.effectAllowed = 'move';
    dataTransfer = {"x": left, "y": top};
    //this.style.left = e.clientX
    //this.style.top = e.clientY
  }
  function handleDrag(evt){
    // console.log(e.clientX + ',' + e.clientY);
  }

  function handleDragEnd(evt){
    
    var offset = dataTransfer;
    evt.target.style.opacity = '1';
    evt.target.style.left = (evt.clientX + offset.x) + 'px';
    evt.target.style.top = (evt.clientY + offset.y)+ 'px';
    //console.log(offset);
  }
  
  var cols = document.querySelectorAll('.column');
[].forEach.call(cols, function(col,i) {
 
  col.style.left = (i+1) * 200;
  col.style.position = 'absolute';
  col.addEventListener('dragstart', handleDragStart, false);
  col.addEventListener('drag',throttle(function(e){handleDrag(e),1000}),false);
  col.addEventListener('dragend',handleDragEnd,false);
  col.addEventListener('mousedown',mouseDown,false)
});
}