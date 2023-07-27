class Node {

    constructor(pos = [0,0]){
        this.x = pos[0];
        this.y = pos[1];
        this.parent = null;

        this.nne = null;
        this.nee = null;
        this.see = null;
        this.sse = null;
        this.ssw = null;
        this.sww = null;
        this.nww = null;
        this.nnw = null;

        //loop to access/modify properties as array
        for(let i = 0; i < Object.keys(this).length; i++){
            Object.defineProperty(this, i, {

                get: function(){
                    return Object.values(this)[i];
                },
                set: function(newValue) {
                    this[Object.keys(this)[i]] = newValue;
                }
            });
        }
    }

    
}

//yMoves in clockwise starting nne
let yMoves = [2,1,-1,-2,-2,-1,1,2];

//xMoves clockwise starting NNE
let xMoves = [1,2,2,1,-1,-2,-2,-1];

function knightMoves(start = [],end = []){

    if(start[0] == end[0] && end[1] == start[1])
    {
        console.log("no moves needed");
        return;
    }
    else if(!isValidPos(start))
    {
          console.log("enter correct start");
          return;
    }
    else if(!isValidPos(end))
    {
        console.log("enter correct end");
        return;
    }
    // // arr[0] is x coordinate
    // let d = distance(start[0],start[1], end[0],end[1]);


    // // if( d > 4)
    // // {
    // //     for(let i = 0; i < 8; i++)
    // //     {
    // //         let newPos = new Array();
    // //         newPos.push(start[0] + yMoves[i]);
    // //         newPos.push(start[1] + xMoves[i]);
    // //         if(){

    // //         }
    // //         else if(distance(newPos[0],newPos[1],end[0],end[1]) > d)
    // //         {
    // //             console.log("distance to great, will not use this position");
    // //         }
            
    // //     }
    // // }
    // // else{

    // // }

    let root = new Node(start);
    let nodesQueue = new Array();
    nodesQueue.push(root);
    // let possibleChilds = childrenQueue([root.x,root.y]);
    let found = false;
    let foundNode;

    while(!found){
        //get childrend of current node at current level
        let currentNode = nodesQueue.shift();
        //get valid children
        let possibleChilds = childrenQueue([currentNode.x,currentNode.y]);
        //see if a child is our end
        for(let i = 0; i < 8; i++){
            if(isChildValid(currentNode,possibleChilds[i],end))
            {
                let newNode = new Node(possibleChilds[i]);
                newNode[2] = currentNode;
                currentNode[3+i] = newNode;
                if(possibleChilds[i][0] == end[0] && possibleChilds[i][1] == end[1])
                {
                    found = true;
                    foundNode = newNode;
                }
                nodesQueue.push(newNode);
            }
        }
        // if so exit and print node to node path
        //if not move onto next node of current level
        //if still no
        //move on to next level
        //use quqeueu to push the nodes?
        //exit when found
    }
    pathFound(foundNode);

};

//function tht returns possible new positions
function childrenQueue(parentArr = []){

    let queue = new Array();
    //an array of arrays

    for(let i = 0; i < 8; i++)
    {
        let newPos = new Array();
        newPos.push(parentArr[0] + xMoves[i]);
        newPos.push(parentArr[1] + yMoves[i]);

        queue.push(newPos);
    }

    return queue;
}

//function to check if it is a valid new position
//checks if - or greater than 8, how distance changes, checks if it already exists as parent or grand etc
function isChildValid(parentNode = new Node(), posArr = [], end = []){

    let parentArr = [parentNode.x,parentNode.y]
    let dist = distance(parentArr,end)

    if(!isValidPos(posArr))
    {
        return false;
    }
    if( dist > 4)
    {
        if(!isDistanceValid(posArr, dist, end))
        {
            return false;
        }
    }
     //now check if it already exists as an ancestor

        if(isNewPos_Rec(parentNode, posArr))
        {
            return true;
        }
        else{
            return false;
        }

    
}

function pathFound(foundNode){
    let prevNode = foundNode[2];
    let currentNode = foundNode;
    path = new Array();
    path.push([foundNode[0],foundNode[1]]);
    while(prevNode != null)
    {
        currentNode = prevNode;
        prevNode = prevNode[2];
        path.push([currentNode[0],currentNode[1]]);
    }
    console.log(path);
}
//will compare the old distance with possible new distance to check if iactually decreases
//called for only distance > 4
function isDistanceValid(newPos =[], oldDist = 0, end = []){

    let newDist = distance(newPos,end)
    
    if(newDist > oldDist)
    {
        return false;
    }
    return true;

}

//will check if the pos exists as an ancestor, recursively?
function isNewPos_Rec(parentNode = new Node(), possiblePos = []){
    if(parentNode == null)
    {
        return true;
    }
    let parentArr = [parentNode.x,parentNode.y];
    if(parentArr[0] == possiblePos[0] && parentArr[1] == possiblePos[1])
    {
        return false;
    }
    else //call for recursion on the parent of this parent
    {
        let grandParent = parentNode.parent;
        let notARepeat = isNewPos_Rec(grandParent, possiblePos);
        if(notARepeat)
        {
            return true;
        }
        else{
            return false;
        }
    }
}

function isValidPos(arr = []) {

    if(arr[0] < 1 || arr[0] > 8 || arr[1] < 1 || arr[1] > 8)
    {
        return false;
    }
    else{ return true;}
}


function distance(start = [], end = []){

    let dist = 0;

    dist = Math.abs( Math.sqrt( Math.pow( (start[1] - end[1]),2) + Math.pow((start[0] - end[0]),2)) )

    return dist;
}


//starting position
//get possible moves
//check if possible moves are the ENd pos or START pos or if distance greater than 4 does it add distance
//if so do NOT add node
//else add node to tree and

//start node -- get chidlren of all nodes
// check if chidlren match end node
//if not add child to tree
// if so add child to tree and set off trigger
//build queue to keep track of path
// trigger will stop recursions and move to path
//print path

//functions

//build tree
    //use nne, nee etc movements to create chldren
    //always point to parent
//search tree level order
//build queu func chldren




// console.log(distance([3,3],[0,0]));
knightMoves([8,1],[4,4]);

// // arr[0] is x coordinate arr[1] is y

// startingNode = new Node([4,4]);

// startingNode[2] = [4,5];

// console.log(startingNode);

// console.log(isDistanceValid([3,3],4,[1,1]));

// let prev = new Node([0,0]);
// let NNE = new Node([1,2]);
// let NEE = new Node([3,3]);
// let SEE = new Node([2,5]);

// prev.nne = NNE;
// NNE.parent = prev;

// NNE.nee = NEE;
// NEE.parent = NNE;

// NEE.see = SEE;
// SEE.parent = NEE;

// console.log(childrenQueue([8,8]));


