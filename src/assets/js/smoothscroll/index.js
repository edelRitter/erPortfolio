function smoothScroll (domElement,pixel,delay)
{
  const intervalToRepeat = 5;
  const step = (intervalToRepeat * pixel) / delay;
  if ( step < pixel)
  {
    domElement.scrollTop += step;
    setTimeout(function (){
      smoothScroll(domElement,pixel - step, delay)
    }, intervalToRepeat);
  }
  
  
}

export function setupSmoothScroll() {
  document.addEventListener('wheel',function (event){
    //only vertical scroll
    if (event.deltaY > 0)
    {
      event.preventDefault();
      smoothScroll(document.documentElement, 100, 1000)
    }
  })
}
