class Airplane {
    type
    sections = []
    capacity
    image

    constructor({...args}) {
        this.setType(args.type)
            .setSections(args.sections ?? [])
            .setCapacity(args.capacity)
            .setImage(args.image)
    }

    getType() {
        return this.type
    }
    setType(type) {
        this.type = type
        return this
    }

    getSections() {
        return this.sections
    }
    setSections(sections) {
        this.sections = sections
        return this
    }

    getCapacity() {
        return this.capacity
    }
    setCapacity(capacity) {
        this.capacity = capacity
        return this
    }

    getImage() {
        return this.image
    }
    setImage(image) {
        this.image = image
        return this
    }
}

export default Airplane;