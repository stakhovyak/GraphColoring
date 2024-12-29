export function greedyColoring(graph) {
    const colors = {};
    const nodes = graph.nodes;

  
    nodes.sort((a, b) => {
        return graph.edges.filter(edge => edge.data.source === a.data.id || edge.data.target === a.data.id).length
            - graph.edges.filter(edge => edge.data.source === b.data.id || edge.data.target === b.data.id).length;
    });


    nodes.forEach(node => {
        const availableColors = new Set([0, 1, 2, 3, 4, 5]);
        graph.edges.forEach(edge => {
            if (edge.data.source === node.data.id && colors[edge.data.target] !== undefined) {
                availableColors.delete(colors[edge.data.target]);
            }
            if (edge.data.target === node.data.id && colors[edge.data.source] !== undefined) {
                availableColors.delete(colors[edge.data.source]);
            }
        });
       
        colors[node.data.id] = Math.min(...[...availableColors]);
    });

    return colors;
}


export function welshPowellColoring(graph) {
    const colors = {};
    const nodes = graph.nodes;

 
    nodes.sort((a, b) => {
        const degreeA = graph.edges.filter(edge => edge.data.source === a.data.id || edge.data.target === a.data.id).length;
        const degreeB = graph.edges.filter(edge => edge.data.source === b.data.id || edge.data.target === b.data.id).length;
        return degreeB - degreeA; 
    });

 
    nodes.forEach(node => {
        const availableColors = new Set([0, 1, 2, 3, 4, 5]);
        graph.edges.forEach(edge => {
            if (edge.data.source === node.data.id && colors[edge.data.target] !== undefined) {
                availableColors.delete(colors[edge.data.target]);
            }
            if (edge.data.target === node.data.id && colors[edge.data.source] !== undefined) {
                availableColors.delete(colors[edge.data.source]);
            }
        });
        colors[node.data.id] = Math.min(...[...availableColors]);
    });

    return colors;
}


export function dsaturColoring(graph) {
    const colors = {};
    const nodes = graph.nodes;
    const saturation = {}; 

    nodes.forEach(node => saturation[node.data.id] = 0);

   
    nodes.sort((a, b) => {
        const degreeA = graph.edges.filter(edge => edge.data.source === a.data.id || edge.data.target === a.data.id).length;
        const degreeB = graph.edges.filter(edge => edge.data.source === b.data.id || edge.data.target === b.data.id).length;
        return degreeB - degreeA; 
    });

    nodes.forEach(node => {
        const availableColors = new Set([0, 1, 2, 3, 4, 5]);
        graph.edges.forEach(edge => {
            if (edge.data.source === node.data.id && colors[edge.data.target] !== undefined) {
                availableColors.delete(colors[edge.data.target]);
                saturation[node.data.id]++;
            }
            if (edge.data.target === node.data.id && colors[edge.data.source] !== undefined) {
                availableColors.delete(colors[edge.data.source]);
                saturation[node.data.id]++;
            }
        });
        colors[node.data.id] = Math.min(...[...availableColors]);
    });

    return colors;
}
