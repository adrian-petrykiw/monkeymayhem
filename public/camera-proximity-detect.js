const cameraProximityDetectComponent = {
    init() {
      console.log('cameraProximityDetectComponent init')
      this.eventToSendOnCameraProximity = "hit"
      this.cameraRange = 0.1
      this.isActive = true
      this.cameraElement = document.getElementById('camera')
    },
    tick() {
      if(!this.isActive) return
  
      const bbox = new THREE.Box3().setFromObject(this.el.object3D)
  
      const distance = bbox.distanceToPoint(this.cameraElement.object3D.position)
  
      // const distance = this.el.object3D.position.distanceTo(this.cameraElement.object3D.position)
      if (distance < this.cameraRange)
      {
        console.log('camera within range')
        this.isActive = false
        this.el.setAttribute('visible', false)
        const event = new Event(this.eventToSendOnCameraProximity)
        this.el.sceneEl.dispatchEvent(event)
      }
    }
  }
  export {cameraProximityDetectComponent}