var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();
var world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false, // <-- important
        background: 'none'
    }
});

render.canvas.width = window.innerWidth
render.canvas.height = window.innerHeight


function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function randomShape(max) {
    const seed = Math.floor(Math.random() * max);

    switch(seed) {
        case 0: return './images/basketbal.png'
        case 1: return './images/rugby.png'
        case 2: return './images/voetbal.png'
        default: return './images/basketbal.png'
    }
}

const boxes = []
for (let x = 0; x < 15; x++) {
    const x = Math.floor(Math.random() * 1000)
    const y = 0
    const w = 22
    const h = 40

    const options = {
        render: {
            sprite: {
                texture: randomShape(3)
            }
        }
    }

    boxes.push(Bodies.circle(x, y, w, options))
}


var ground = Bodies.rectangle(0, window.innerHeight - 150, window.innerWidth * 2, 50, { isStatic: true }); 


// add all of the bodies to the world
Composite.add(engine.world, [...boxes, ground]);

// run the renderer
Render.run(render);

let mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }

        }
    })

World.add(world, mouseConstraint)

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);