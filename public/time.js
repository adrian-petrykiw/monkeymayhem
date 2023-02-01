const timeManagerComponent = {
    init() {
      console.log('init')
      this.timeValue = 0
      this.timeElement = document.getElementById('score')
  
      this.el.sceneEl.addEventListener('hit', () => {
        this.scoreValue++
        this.scoreElement.innerHTML = this.scoreValue
      })
    },
  
  }
  
  let time = 50;
  
  const interval = setInterval(() => {
    time -= 1;
    document.querySelector("#timer").innerHTML = time
    if (time <= 0) {
      clearInterval(interval)
      console.log("Time's up!")
    }
  }, 1000)
  