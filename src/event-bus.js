class XHEventBus {
    constructor(){
        this.eventBus = {}
    }
    on(eventName,eventCallback,thisArg){
        if (typeof eventName !== "string") {
            throw new TypeError("the event name must be string type")
          }
      
          if (typeof eventCallback !== "function") {
            throw new TypeError("the event callback must be function type")
          }
          let handlers = this.eventBus[eventName]
          if(!handlers){
              handlers = []
              this.eventBus[eventName] = handlers
          }
          handlers.push({
              eventCallback,
              thisArg
          })
          //console.log(this.eventBus)
          return this
    }
    off(eventName,eventCallback,thisArg){
        if (typeof eventName !== "string") {
            throw new TypeError("the event name must be string type")
          }
        if (typeof eventCallback !== "function") {
            throw new TypeError("the event callback must be function type")
        }
        const handlers = this.eventBus[eventName]
        if(handlers && eventCallback){
            let newHandlers = [...handlers]
            for(let i = 0;i < newHandlers;i++){
                let handler = newHandlers[i]
                if(handler.eventCallback === eventCallback){
                    const index = handlers.indexOf(handler)
                    handlers.splice(index,1)
                }
            }
        }
        if(handlers.length === 0){
            delete this.eventBus[eventName]
        }
    }
    once(eventName,eventCallback,thisArg){
        if (typeof eventName !== "string") {
            throw new TypeError("the event name must be string type")
          }
        if (typeof eventCallback !== "function") {
            throw new TypeError("the event callback must be function type")
        }
        const tempCallback = (...payload) => {
            this.off(eventName,tempCallback)
            eventCallback.apply(thisArg,payload)
        }
        return this.on(eventName,tempCallback,thisArg)
    }
    emit(eventName, ...payload) {
        if (typeof eventName !== "string") {
          throw new TypeError("the event name must be string type")
        }
    
        const handlers = this.eventBus[eventName] || []
        handlers.forEach(handler => {
          handler.eventCallback.apply(handler.thisArg, payload)
        })
        return this
      }
}

module.exports = XHEventBus