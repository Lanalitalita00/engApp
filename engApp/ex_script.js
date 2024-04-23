class MotAPlacer {
    constructor(name, positions, whereItShouldBe) {
        this.name = name;
        this.positions = positions;
        this.objectif = whereItShouldBe;
        this.docEl = document.createElement("p");
        this.docEl.id = name;
        this.docEl.className = "draggable unselectable";
        this.docEl.textContent = name;
        this.docEl.style.position = "absolute";
        this.docEl.style.left = positions.x + "px";
        this.docEl.style.top = positions.y + "px";
        this.makeDraggable(); // Call the makeDraggable method
        document.body.appendChild(this.docEl);
    }

    // Method to make the element draggable
    makeDraggable() {
        // Reference to the element
        const element = this.docEl;

        // Variables to store initial mouse position relative to the element
        let initialX, initialY;
        let isDragging = false;

        // Function to handle mouse down event
        const onMouseDown = (event) => {
            // Update flag to indicate dragging has started
            isDragging = true;

            // Get initial mouse position relative to the element
            initialX = event.clientX - element.offsetLeft;
            initialY = event.clientY - element.offsetTop;

            // Add event listeners for mouse move and mouse up events
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        // Function to handle mouse move event
        const onMouseMove = (event) => {
            // If dragging is in progress
            if (isDragging) {
                // Calculate new position of the element
                const newX = event.clientX - initialX;
                const newY = event.clientY - initialY;

                // Update element position
                element.style.left = newX + 'px';
                element.style.top = newY + 'px';

                // Calculate positions of corners
                const rect = element.getBoundingClientRect();

                // Log the positions of corners along with the element ID
                console.log('Element ID:', element.id);
                const middle = this.getMiddle(rect.left, rect.right, rect.bottom, rect.top);
                console.log(middle);

                // Check if the element is close to the objectif
                this.checkPosition(middle);
            }
        };

        // Function to handle mouse up event
        const onMouseUp = () => {
            // Update flag to indicate dragging has stopped
            isDragging = false;

            // Remove event listeners for mouse move and mouse up events
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        // Attach mouse down event listener to the element
        element.addEventListener('mousedown', onMouseDown);

        // Store the onMouseDown function reference to be used in removing the listener
        this.onMouseDown = onMouseDown;
    }

    // Method to calculate the middle point
    getMiddle(left, right, bottom, top) {
        const middleX = (left + right) / 2;
        const middleY = (bottom + top) / 2;
        return { x: middleX, y: middleY };
    }

    // Method to check if the element is close to the objectif
    checkPosition(middle) {
        const tolerance = 30; // Adjust the tolerance as needed
        const objX = this.objectif.x;
        const objY = this.objectif.y;
        const elementX = middle.x;
        const elementY = middle.y;

        // Check if the element is close to the objectif
        if (
            Math.abs(objX - elementX) <= tolerance &&
            Math.abs(objY - elementY) <= tolerance
        ) {
            console.log(`${this.name} is close to the objectif.`);
            this.makeUndraggable(); // Make the element not draggable anymore
        }
    }

    // Method to make the element not draggable anymore
    makeUndraggable() {
        // Reference to the element
        const element = this.docEl;

        // Dispatch mouseup event to stop dragging
        element.dispatchEvent(new MouseEvent("mouseup"));

        // Set the element's position to the objective coordinates
        element.style.left = this.objectif.x + "px";
        element.style.top = this.objectif.y + "px";

        // Change element appearance to indicate it's in place
        element.style.backgroundColor = "green";
        element.style.width = "auto";

        // Remove the mouse down event listener
        element.removeEventListener('mousedown', this.onMouseDown);
        this.checkAllCorrect();
    }

    // checks if the position is the same as objectif pposition
    checkSameObj() {
        if (this.positions.x == this.objectif.x) {
            if (this.positions.y == this.objectif.y) {
                return true
            }
        }
        return false
    }

    // Checks if all outer elements are in the correct position
    checkAllCorrect() {
        var val = false
        for (const objet in elArray) {
            console.log(objet);
            if (elArray[objet].checkSameObj) {
                val = true
            } else {
                val = false
            }
        }
        if (val == true) {
            console.log("exercise done")
            document.querySelector("#tester").innerHTML = "Done";
        }
    }

}


// Example usage:
var strings = ['Arbre', 'Patate', 'Poire'];
var positions = [{ x: 50, y: 30 }, { x: 150, y: 30 }, { x: 250, y: 30 }];
var objectif = [{x: 80, y:40}, {x:40, y:80}, {x:100, y:100}]

var elArray = [];

for (let x = 0; x < strings.length; x++) {
    elArray.push(new MotAPlacer(strings[x], positions[x], objectif[x]))
}
console.log(elArray);