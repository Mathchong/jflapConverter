const fs = require('fs');
const DOMParser = require('xmldom').DOMParser; 
fs.readFile('convert.txt', 'utf8', (err,data)=>{
    if(err){
        console.error(err);
        return
    }

const resultJSON = parseXMLToJSON(data);
console.log(resultJSON.afdString);
console.log(resultJSON.parsedTransitions.join('\n'));
   
})

function parseXMLToJSON(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const stateNodes = xmlDoc.getElementsByTagName("state");
    const transitionNodes = xmlDoc.getElementsByTagName("transition");

    const statesArray = [];
    for (let i = 0; i < stateNodes.length; i++) {
        const stateNode = stateNodes[i];
        const id = parseInt(stateNode.getAttribute("id"));
        const name = stateNode.getAttribute("name");
        const isInitial = stateNode.getElementsByTagName("initial").length > 0;
        const isFinal = stateNode.getElementsByTagName("final").length > 0;

        const stateJSON = {
            id: id,
            name: name,
            initial: isInitial,
            final: isFinal
        };

        statesArray.push(stateJSON);
    }

    const transitionsArray = [];
    for (let i = 0; i < transitionNodes.length; i++) {
        const transitionNode = transitionNodes[i];
        const fromId = transitionNode.getElementsByTagName("from")[0].textContent;
        const toId = transitionNode.getElementsByTagName("to")[0].textContent;
        const read = transitionNode.getElementsByTagName("read")[0].textContent;

        const fromState = statesArray.find(state => state.id === parseInt(fromId));
        const toState = statesArray.find(state => state.id === parseInt(toId));

        const transitionJSON = {
            from: fromState.name,
            to: toState.name,
            read: read
        };

        transitionsArray.push(transitionJSON);
    }

    const alphabetSet = new Set();
    transitionsArray.forEach(transition => {
        alphabetSet.add(transition.read);
    });

    const alphabetArray = Array.from(alphabetSet);
    const sortedAlphabet = alphabetArray.sort();

    const formattedAlphabet = `{${sortedAlphabet.join(',')}}`;

    const initialStates = statesArray.filter(state => state.initial).map(state => state.name);
    const finalStates = statesArray.filter(state => state.final).map(state => state.name);

    const formattedInitialStates = `{${initialStates.join(', ')}}`;
    const formattedFinalStates = `{${finalStates.join(', ')}}`;

    const allStates = statesArray.map(state => state.name);
    const formattedAllStates = `{${allStates.join(', ')}}`;

    const afdString = `AFD = (E=${formattedAllStates}, ∑=${formattedAlphabet}, δ, i=${formattedInitialStates}, f=${formattedFinalStates})`;

    const parsedTransitions = [];
    for (let i = 0; i < transitionNodes.length; i++) {
        const transitionNode = transitionNodes[i];
        const fromId = transitionNode.getElementsByTagName("from")[0].textContent;
        const toId = transitionNode.getElementsByTagName("to")[0].textContent;
        const read = transitionNode.getElementsByTagName("read")[0].textContent;

        const fromState = statesArray.find(state => state.id === parseInt(fromId));
        const toState = statesArray.find(state => state.id === parseInt(toId));

        const transitionString = `δ(${fromState.name},${read}) = ${toState.name}`;

        parsedTransitions.push(transitionString);
    }

    parsedTransitions.sort();

    return {
        states: statesArray,
        transitions: transitionsArray,
        alfabeto: formattedAlphabet,
        afdString: afdString,
        parsedTransitions: parsedTransitions
    };
}