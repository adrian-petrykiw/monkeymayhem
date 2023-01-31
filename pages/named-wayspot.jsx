// Updates a single a-entity to track a Wayspot with the given name.
const namedWayspotComponent = {
    schema: {
      name: {type: 'string'},
    },
    init() {
      const {object3D} = this.el
      const {name} = this.data
      this.el.sceneEl.addEventListener('realityready', () => {
        object3D.visible = false
      })
  
      const foundWayspot = ({detail}) => {
        if (name !== detail.name) {
          return
        }
        object3D.position.copy(detail.position)
        object3D.quaternion.copy(detail.rotation)
        object3D.visible = true
      }
  
      const lostWayspot = ({detail}) => {
        if (name !== detail.name) {
          return
        }
        object3D.visible = false
      }
  
      this.el.sceneEl.addEventListener('xrprojectwayspotfound', foundWayspot)
      this.el.sceneEl.addEventListener('xrprojectwayspotlost', lostWayspot)
    },
  }
  
  export {namedWayspotComponent}