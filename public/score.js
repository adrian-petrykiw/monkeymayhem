const scoreManagerComponent = {
    init() {
      console.log('init')
      this.scoreValue = 0
      this.scoreElement = document.getElementById('score')
  
      this.el.sceneEl.addEventListener('hit', () => {
        this.scoreValue++
        this.scoreElement.innerHTML = this.scoreValue
      })
    },
    tick() {
      // this.scoreValue = this.scoreValue + 1
      // console.log(this.scoreValue)
      // this.scoreElement.innerHTML = this.scoreValue
    },
  }
  export {scoreManagerComponent}
  