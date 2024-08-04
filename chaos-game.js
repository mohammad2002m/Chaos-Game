class ChaosGame {
    constructor(drawer, configuration) {
        this.drawer = drawer;
        this.configuration = configuration;
    }
    start() {
        const repeat = this.configuration.repeat;
        const numberOfPoints = this.configuration.numberOfPoints;
        const radius = this.configuration.radius;
        const factor = this.configuration.factor;
        const avoidLast = this.configuration.avoidLast;
        const avoidBackward = this.configuration.avoidBackward;
        const avoidForward = this.configuration.avoidForward;
        const centralizeX = this.configuration.centralizeX;
        const centralizeY = this.configuration.centralizeY;
        const coloring = this.configuration.coloring;
        const colors = this.configuration.colors;

        const points = [];
        let angle = -Math.PI / 2;
        for (let i = 0; i < numberOfPoints; i++) {
            const center = drawer.center();
            const x = Math.floor(center.x + radius * Math.cos(angle)) + (1/2 - 1 / factor) * centralizeX;
            const y = Math.floor(center.y + radius * Math.sin(angle)) + (1/2 - 1 / factor) * centralizeY;
            points.push({ x: x, y: y });
            angle += (2 * Math.PI) / numberOfPoints;
        }

        let repitionCounter = repeat;
        let lastDrawnPoint = null;
        let lastChosenPoint = -1;
        const allPoints = [];
        while (repitionCounter--) {
            let randomPoint = Math.floor(Math.random() * points.length);

            let retries = 0;
            // some combinations can lead to infinite loop, this is a quick fix
            while (
                ((avoidLast != -1 && lastChosenPoint == randomPoint) ||
                (avoidBackward != -1 && Helpers.shift(lastChosenPoint, avoidBackward, points.length) == randomPoint) ||
                (avoidForward != -1 && lastChosenPoint == Helpers.shift(randomPoint, avoidForward, points.length))) &&
                retries < 10
            ) {
                // generate a random point between 0 and points.length - 1
                randomPoint = Math.floor(Math.random() * points.length);
                retries++;
            }
            
            allPoints.push(randomPoint);
            
            if (lastDrawnPoint === null) {
                lastDrawnPoint = points[randomPoint];
                continue;
            }

            let newPoint = {
                x: Math.floor((lastDrawnPoint.x + points[randomPoint].x) / factor),
                y: Math.floor((lastDrawnPoint.y + points[randomPoint].y) / factor),
            };

            const color = coloring ? colors[randomPoint] : "white";

            drawer.drawPoint(newPoint.x, newPoint.y ,color);

            lastDrawnPoint = newPoint;
            lastChosenPoint = randomPoint;
        }

        console.log(allPoints);
    }
}
