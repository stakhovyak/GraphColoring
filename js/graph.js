export function generateRandomGraph(numNodes, density) {
    const nodes = [];
    const edges = [];
    
  
    for (let i = 0; i < numNodes; i++) {
        nodes.push({ data: { id: `${i}` } });
    }

   
    for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          
            if (Math.random() < density) {
                edges.push({ data: { source: `${i}`, target: `${j}` } });
            }
        }
    }

    return { nodes, edges };
}


export function generatePlanarGraph(numNodes) {

    return generateRandomGraph(numNodes, 0.5); 
}


export function generateBipartiteGraph(numNodes) {
    const nodes = [];
    const edges = [];
    const half = Math.floor(numNodes / 2);

    
    for (let i = 0; i < half; i++) {
        nodes.push({ data: { id: `${i}` } });
        nodes.push({ data: { id: `${i + half}` } });
    }

    
    for (let i = 0; i < half; i++) {
        for (let j = half; j < numNodes; j++) {
            edges.push({ data: { source: `${i}`, target: `${j}` } });
        }
    }

    return { nodes, edges };
}
