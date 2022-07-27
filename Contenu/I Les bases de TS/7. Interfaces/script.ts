interface Rocket {
    reactors: number;
    vMax: number;
    takeOff: (action: string) => void
}

interface Rocket {
    price: number;
    carburant: number;
}

class RocketFactory implements Rocket {
    reactors: number;
    vMax: number;
    price: number;
    carburant: number;

    constructor(reactors: number, vMax: number, price: number, carburant: number) {
        this.reactors = reactors;
        this.vMax = vMax;
        this.price = price;
        this.carburant = carburant;
    }
    takeOff(action: string){
        console.log(action);
    }
}
const Falcon1 = new RocketFactory(12,900,2,9000)
console.log(Falcon1);
Falcon1.takeOff('Décollage')